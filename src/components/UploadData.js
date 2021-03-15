/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
// import update from 'react-addons-update'; // ES6
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { putDataset } from '../database/databaseCalls';

// import { Button } from 'reactstrap';

class UploadData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: null,
      appCategory: null,
      numAttributes: null,
      appURL: null,

      appNameSubmitted: false,
      categorySubmitted: false,
      appURLSubmitted: false,
      readyForRangesButton: false,
      readyForRanges: false,
      addAttributeForms: true,
      readyForSubmit: false,
      finalRangesEntered: false,
      readyOnce: false,

      attributeNameList: [],
      attributeTypeList: [],
      attributeTypeSubmitted: 0, // counter of number of attributes with a type
      attributeTypeDict: {},
      attributeNameDict: {},
      attributeDescriptionDict: {},
      attributeDescriptionList: [],

      attributeRangeMins: [],
      attributeRangeMaxes: [],
      attributeRangeInputs: [],
      attributeRangeMinDict: {},
      attributeRangeMaxDict: {},
      inputDatatypeFormList: [],
    };
  }

  componentDidMount() {
    Auth.currentSession()
      .then((data) => {
        const user = data.accessToken.payload.username;
        this.setState({ currentUser: user });
      });
  }

  // sets the number of attributes
  numAttributesOnChange = (event) => {
    this.setState({ numAttributes: event.target.value });
  }

  // add the attribute name, make sure it only enters once (with the repeat stuff)
  addAttributeName = (event, i) => {
    let repeat = false;
    for (const attribute in this.state.attributeNameDict) {
      if (attribute.S === event.target.value) { repeat = true; }
    }
    if (!repeat) {
      console.log(event.target.value);
      this.state.attributeNameDict[i] = { S: event.target.value };
      this.setState({ addAttributeForms: false });
    }
  }

  addAttributeDescription = (event, i) => {
    this.setState((state) => {
      // eslint-disable-next-line no-param-reassign
      state.attributeDescriptionDict[i] = { S: event.target.value };
      return {
        ...state,
      };
    });
  }

  isEmptyDescription = () => {
    console.log(this.state.attributeDescriptionDict);
    for (let i = 0; i < Object.keys(this.state.attributeDescriptionDict).length; i += 1) {
      if (this.state.attributeDescriptionDict[i].S === '') return true;
    }
    return false;
  }

  // set the range minimum to the value (stringify)
  addAttributeRangeMin = (event, i) => {
    // this.state.attributeRangeMins.push({ S: event.target.value });
    this.state.attributeRangeMinDict[i] = { S: event.target.value };
  }

  // set the range maximum to the value (stringify)
  addAttributeRangeMax = (event, i) => {
    // this.state.attributeRangeMaxes.push({ S: event.target.value });
    this.state.attributeRangeMaxDict[i] = { S: event.target.value };
    this.setState({ addAttributeForms: false });
  }

  // make sure that the attribute type is NOT none!
  // if you are changing to a type AND it is either from none OR it is none of the existing types (i.e. it hasn't been made yet!)
  addAttributeType = (event, i) => {
    if (!(event.target.value === '')) {
      // if you are changing the value back to none!
      // if this exists even
      if (this.state.attributeTypeDict[i]) {
        if (event.target.value === 'O' && !(event.target.value === this.state.attributeTypeDict[i].S)) {
          // this.setState({
          // attributeTypeDict: update(this.state.ttributeTypeDict, { i: event.target.value }),
          // });
          this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
          this.setState((state) => {
            return { attributeTypeSubmitted: state.attributeTypeSubmitted - 1 };
          });
          // this.setState({ attributeTypeSubmitted: this.state.attributeTypeSubmitted - 1 });
        } else if (!(event.target.value === 'O') && (this.state.attributeTypeDict[i].S === 'O')) {
          this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
          this.setState((state) => {
            return { attributeTypeSubmitted: state.attributeTypeSubmitted + 1 };
          });
        }
      } else {
        console.log('not exists');
        if (!(event.target.value === 'O')) {
          this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
          this.setState((state) => {
            return { attributeTypeSubmitted: state.attributeTypeSubmitted + 1 };
          });
        } else {
          this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
        }
        this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
      }
    }
  }

  // count number of attributes
  getNumNumberAttributes = () => {
    let numNumAttributes = 0;
    for (const key in this.state.attributeTypeDict) {
      if (this.state.attributeTypeDict[key].S === 'N') numNumAttributes += 1;
    }
    return numNumAttributes;
  }

  // make sure max > min!
  checkValidRanges = () => {
    const numNumberAttributes = this.getNumNumberAttributes();
    if (numNumberAttributes > 0) {
      for (let i = 0; i < numNumberAttributes; i += 1) {
        const supposedMin = this.state.attributeRangeMins[i];
        const supposedMax = this.state.attributeRangeMaxes[i];
        if (Number.parseInt(supposedMin.S, 10) > Number.parseInt(supposedMax.S, 10)) {
          this.state.attributeRangeMins[i] = supposedMax;
          this.state.attributeRangeMaxes[i] = supposedMin;
        }
        if (supposedMin === supposedMax) this.state.attributeRangeMins[i] = String(Number.parseInt(supposedMin, 10) - 0.1);
      }
    }
  }

  // get attribute name + type!
  buildAttributeNameAndTypeAndDescriptionLists = () => {
    for (let i = 0; i < Object.keys(this.state.attributeNameDict).length; i += 1) {
      this.state.attributeNameList.push(this.state.attributeNameDict[i]);
      this.state.attributeTypeList.push(this.state.attributeTypeDict[i]);
      this.state.attributeDescriptionList.push(this.state.attributeDescriptionDict[i]);
    }
  }

  // get range list
  buildAttributeRangeLists = () => {
    for (let i = 0; i < Object.keys(this.state.attributeRangeMinDict).length; i += 1) {
      this.state.attributeRangeMins.push(this.state.attributeRangeMinDict[i]);
      this.state.attributeRangeMaxes.push(this.state.attributeRangeMaxDict[i]);
    }
  }

  submitAttributes = () => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };

    this.buildAttributeNameAndTypeAndDescriptionLists();
    this.buildAttributeRangeLists();
    this.checkValidRanges();

    // including the app url
    putDataset(callback, this.state.appName,
      this.state.appCategory, this.state.appURL,
      this.state.attributeNameList, this.state.attributeTypeList,
      this.state.attributeRangeMins, this.state.attributeRangeMaxes, this.state.attributeDescriptionList,
      this.state.currentUser);

    document.getElementById('appNameInput').value = '';
    document.getElementById('appURLInput').value = '';

    this.setState({ appName: null });
    this.setState({ appCategory: null });
    this.setState({ numAttributes: null });
    this.setState({ attributeNameList: [] });
    this.setState({ attributeNameDict: {} });

    this.setState({ attributeTypeList: [] });
    this.setState({ attributeTypeDict: {} });

    this.setState({ attributeRangeMins: [] });
    this.setState({ attributeRangeMinDict: {} });

    this.setState({ attributeRangeMaxes: [] });
    this.setState({ attributeRangeMaxDict: {} });

    this.setState({ appNameSubmitted: false });
    this.setState({ categorySubmitted: false });
    this.setState({ appURLSubmitted: false });
    this.setState({ readyOnce: false });

    this.setState({ appURL: null });
    this.setState({ inputDatatypeFormList: [] });
    this.setState({ attributeRangeInputs: [] });
    this.setState({ attributeTypeSubmitted: 0 });
    this.setState({ readyForSubmit: false });
    this.setState({ readyForRanges: false });
    this.setState({ readyForRangesButton: false });
    this.setState({ addAttributeForms: true });
    this.setState({ finalRangesEntered: false });
  }

  // change app specified num users, make sure it is an apple app store URL and not some junk
  addAppURL = (event) => {
    console.log(event.target.value.startsWith('https://apps.apple.com'));
    if (!(event.target.value === '') && (event.target.value.startsWith('https://apps.apple.com'))) {
      this.setState({ appURL: event.target.value });
      this.setState({ appURLSubmitted: true });
    } else {
      this.setState({ appURLSubmitted: false });
    }
  }

  // change app specified category, make sure their category is not None
  addAppCategory = (event) => {
    if (!(event.target.value === '')) {
      if (!(event.target.value === 'None')) {
        this.setState({ appCategory: event.target.value });
        this.setState({ categorySubmitted: true });
      } else {
        this.setState({ appCategory: event.target.value });
        this.setState({ categorySubmitted: false });
      }
    } else {
      this.setState({ categorySubmitted: false });
    }
  }

  renderAppCategory = () => {
    if (!this.state.categorySubmitted) {
      return (
        <div>
          <h2>What category is your app in?</h2>
          <div>
            <div>
              <select id="categoryInput" value={this.state.appCategory} onChange={(e) => this.addAppCategory(e)}>
                <option value="None">None</option>
                <option value="Health">Health</option>
                <option value="Location">Location</option>
                <option value="Consumer">Consumer</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <h4><i>invalid - app must have a category</i></h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>What category is your app in?</h2>
          <div>
            <div>
              <select onChange={(e) => this.addAppCategory(e)}>
                <option value="None">None</option>
                <option value="Health">Health</option>
                <option value="Location">Location</option>
                <option value="Consumer">Consumer</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <h4><i><span>&#10003;</span></i></h4>
          </div>
        </div>
      );
    }
  }

  addAppName = (event) => {
    if (!(event.target.value === '')) {
      this.setState({ appName: event.target.value });
      this.setState({ appNameSubmitted: true });
    } else {
      this.setState({ appNameSubmitted: false });
    }
  }

  renderAppNameInput = () => {
    if (!this.state.appNameSubmitted) {
      return (
        <div>
          <h2>What is your app named?</h2>
          <div>
            <input id="appNameInput" type="text" placeholder="name" onChange={(e) => this.addAppName(e)} />
            <h4><i>invalid - app must have a name</i></h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>What is your app named?</h2>
          <div>
            <input id="appNameInput" type="text" placeholder="name" onChange={(e) => this.addAppName(e)} />
            <h4><i><span>&#10003;</span></i></h4>
          </div>
        </div>
      );
    }
  }

  readyForSubmit = () => {
    if (this.state.finalRangesEntered && this.state.appURLSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted) {
      this.setState({ readyForSubmit: true });
      this.setState({ readyOnce: true });
    } else {
      this.setState({ readyForSubmit: false });
    }
  }

  // checks if the ranges have been input correctly
  checkIfRangesReady = () => {
    if ((Object.keys(this.state.attributeRangeMaxDict).length === this.state.attributeRangeInputs.length && !this.state.readyForSubmit) // all our number attributes have ranges
    || ((Object.keys(this.state.attributeTypeDict).length === Number.parseInt(this.state.numAttributes, 10)
    && Object.keys(this.state.attributeNameDict).length === Number.parseInt(this.state.numAttributes, 10)) && this.getNumNumberAttributes() < 1)) {
      this.setState({ finalRangesEntered: true });
    }
  }

  // renders the range inputs
  readyForRanges = () => {
    this.setState({ readyForRanges: true });
    for (let i = 0; i < Object.keys(this.state.attributeTypeDict).length; i += 1) {
      if (this.state.attributeTypeDict[i].S === 'N') {
        this.state.attributeRangeInputs.push(
          <div className="attribute">
            <h3>{this.state.attributeNameDict[i].S}</h3>
            <label className="attrLabel" htmlFor="rangeMin">   Attribute Min: </label>
            <input id="rangeMin" type="number" onChange={(e) => this.addAttributeRangeMin(e, i)} />
            <label className="attrLabel" htmlFor="rangeMax">   Attribute Max: </label>
            <input id="rangeMax" type="number" onChange={(e) => this.addAttributeRangeMax(e, i)} />
          </div>,
        );
      }
    }
  }

  renderAttributeFields = () => {
    if (!this.state.numAttributes) {
      return (
        <div>
          <h2>Add Your Attributes</h2>
          <label htmlFor="attrNum">Number of Attributes:  </label>
          <select id="attrNum" onChange={(e) => this.numAttributesOnChange(e)}>
            <option value="1">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      );
    } else {
      if (this.state.addAttributeForms) {
        for (let i = 0; i < this.state.numAttributes; i += 1) {
          this.state.inputDatatypeFormList.push(
            <div className="attribute">
              <input type="text" placeholder="Attribute Name" onChange={(e) => this.addAttributeName(e, i)} />
              <select style={{ margin: '0px 50px' }} onChange={(e) => this.addAttributeType(e, i)}>
                <option value="O">None</option>
                <option value="S">String</option>
                <option value="N">Number</option>
                <option value="B">Binary</option>
              </select>
              <label htmlFor="description">Attribute Description: </label>
              <textarea id="description" rows="5" cols="33" onChange={(e) => this.addAttributeDescription(e, i)} />
            </div>,
          );
        }
        this.setState({ addAttributeForms: false });
      }
      // if attribute input forms have been rendered
      if (this.state.readyForRangesButton) {
        if (Object.keys(this.state.attributeNameDict).length < this.state.numAttributes || Object.keys(this.state.attributeTypeDict).length < this.state.numAttributes
        || this.state.attributeTypeSubmitted < this.state.numAttributes // not enough attribute names or not enough attribute types
        || Object.keys(this.state.attributeDescriptionDict).length < this.state.numAttributes // or not enough attribute descriptions
        || this.isEmptyDescription()) { // any
          console.log(this.state.attributeDescriptionDict);
          return (
            <div className="dataLists">
              <div className="typesList">
                <h2>Add Your Attributes</h2>
                {this.state.inputDatatypeFormList}
                <h3><i>Submit nonempty attribute names, types, and descriptions to proceed</i></h3>
              </div>
            </div>
          );
        } else { // if all names, types, and descriptions are correct
          return (
            <div className="dataLists">
              <div className="typesList">
                <h2>Add Your Attributes</h2>
                {this.state.inputDatatypeFormList}
                <button type="submit" className="submit" onClick={() => { this.readyForRanges(); }}>Ranges</button>
                <p><i>If you only have string attributes, you will skip ranges</i></p>
              </div>
            </div>
          );
        }
      } else { // if first four forms aren't even full...
        return (
          <div className="dataLists">
            <div className="typesList">
              <h2>Add Your Attributes</h2>
              {this.state.inputDatatypeFormList}
              <h3><i>Submit all forms to enter dataset</i></h3>
            </div>
          </div>
        );
      }
    }
  }

  checkForSubmit = () => {
    if (this.state.finalRangesEntered && this.state.appURLSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted) {
      this.readyForSubmit();
    }
  }

  renderAttributeRanges = () => {
    if (this.state.readyForRanges) { // we are ready to render the ranges
      if (this.state.readyForSubmit && this.state.appURLSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted) { // all ranges have been put in
        if (this.getNumNumberAttributes() < 1) {
          return (
            <div>
              <h4><i>No number type fields, please submit</i></h4>
              <Link to="/documentation" style={{ textDecoration: 'none' }}>
                <button type="submit" className="submit" onClick={() => { this.submitAttributes(); }}>Submit</button>
              </Link>
            </div>
          );
        }
        return (
          <div>
            <h4><i>Ranges and all other fields entered correctly, please submit dataset</i></h4>
            <Link to="/documentation" style={{ textDecoration: 'none' }}>
              <button type="submit" className="submit" onClick={() => { this.submitAttributes(); }}>Submit</button>
            </Link>
          </div>
        );
      } else {
        this.checkForSubmit();
        if (this.state.readyOnce) {
          return (
            <div>
              <h4><i>Please submit one of the top four fields to submit</i></h4>
            </div>
          );
        } else {
          return (
            <div>
              {this.state.attributeRangeInputs}
              <button type="button" className="submit" onClick={() => this.checkIfRangesReady()}>Submit Ranges</button>
            </div>
          );
        }
      }
    } else {
      return (
        null
      );
    }
  }

  // render number of users to input
  renderAppURLInput = () => {
    if (!this.state.appURLSubmitted) { // if number of users hasn't been submitted yet, give invalid message, make sure the number is positive!
      return (
        <div>
          <h2>What is your app URL?</h2>
          <div>
            <input id="appURLInput" type="text" placeholder="https://apps.apple.com" onChange={(e) => this.addAppURL(e)} />
            <h4><i>invalid - must submit a url that begins with https://apps.apple.com...</i></h4>
          </div>
        </div>
      );
    } else { // number of users submitted, valid
      return (
        <div>
          <h2>What is your app URL?</h2>
          <div>
            <input id="appURLInput" type="text" placeholder="https://apps.apple.com" onChange={(e) => this.addAppURL(e)} />
            <h4><i><span>&#10003;</span></i></h4>
          </div>
        </div>
      );
    }
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    if (!this.state.readyForRangesButton) {
      if (this.state.appNameSubmitted && this.state.categorySubmitted && this.state.appURLSubmitted) {
        this.setState({ readyForRangesButton: true });
      }
    }
    return (
      <>
        <div>
          <h1>Upload Your Data</h1>
          <div>
            {this.renderAppNameInput()}
            {this.renderAppURLInput()}
            {this.renderAppCategory()}
            {this.renderAttributeFields()}
            {this.renderAttributeRanges()}
          </div>
        </div>
      </>
    );
  }
}

export default UploadData;
