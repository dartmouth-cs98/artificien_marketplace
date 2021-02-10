/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
// import update from 'react-addons-update'; // ES6
import { Link } from 'react-router-dom';
import { putDataset } from '../database/databaseCalls';

// import { Button } from 'reactstrap';

class UploadData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: null,
      appCategory: null,
      datasetName: null,
      numAttributes: null,
      numUsers: null,

      appNameSubmitted: false,
      categorySubmitted: false,
      datasetNameSubmitted: false,
      numUsersSubmitted: false,
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

      attributeRangeMins: [],
      attributeRangeMaxes: [],
      attributeRangeInputs: [],
      attributeRangeMinDict: {},
      attributeRangeMaxDict: {},
      inputDatatypeFormList: [],
    };
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

  // set the range minimum to the value (stringify)
  addAttributeRangeMin = (event, i) => {
    console.log(event.target.value);
    console.log(i);
    // this.state.attributeRangeMins.push({ S: event.target.value });
    this.state.attributeRangeMinDict[i] = { S: event.target.value };
  }

  // set the range maximum to the value (stringify)
  addAttributeRangeMax = (event, i) => {
    console.log(event.target.value);
    // this.state.attributeRangeMaxes.push({ S: event.target.value });
    this.state.attributeRangeMaxDict[i] = { S: event.target.value };
    this.setState({ addAttributeForms: false });
  }

  // make sure that the attribute type is NOT none!
  // if you are changing to a type AND it is either from none OR it is none of the existing types (i.e. it hasn't been made yet!)
  addAttributeType = (event, i) => {
    if (!(event.target.value === '')) {
      console.log(event.target.value);
      console.log(this.state.attributeTypeSubmitted);
      // if you are changing the value back to none!
      // if this exists even
      if (this.state.attributeTypeDict[i]) {
        console.log('exists');
        console.log(event.target.value);
        console.log(this.state.attributeTypeDict[i].S);
        console.log(this.state.readyForRangesButton);
        if (event.target.value === 'O' && !(event.target.value === this.state.attributeTypeDict[i].S)) {
          // this.setState({
          // attributeTypeDict: update(this.state.ttributeTypeDict, { i: event.target.value }),
          // });
          this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
          this.setState((state) => {
            return { attributeTypeSubmitted: state.attributeTypeSubmitted - 1 };
          });
          // this.setState({ attributeTypeSubmitted: this.state.attributeTypeSubmitted - 1 });
          console.log(this.state.attributeTypeSubmitted);
          console.log('decrementing counter');
        } else if (!(event.target.value === 'O') && (this.state.attributeTypeDict[i].S === 'O')) {
          this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
          this.setState((state) => {
            return { attributeTypeSubmitted: state.attributeTypeSubmitted + 1 };
          });
          console.log(this.state.attributeTypeSubmitted);
          console.log('incrementing counter');
        }
      } else {
        console.log('not exists');
        if (!(event.target.value === 'O')) {
          this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
          this.setState((state) => {
            return { attributeTypeSubmitted: state.attributeTypeSubmitted + 1 };
          });
          console.log('incrementing counter on new input');
          console.log(this.state.attributeTypeSubmitted);
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
      console.log(this.state.attributeRangeMins);
      for (let i = 0; i < numNumberAttributes; i += 1) {
        const supposedMin = this.state.attributeRangeMins[i];
        const supposedMax = this.state.attributeRangeMaxes[i];
        console.log('Min');
        console.log(supposedMin);
        if (Number.parseInt(supposedMin.S, 10) > Number.parseInt(supposedMax.S, 10)) {
          console.log('swap min and max');
          this.state.attributeRangeMins[i] = supposedMax;
          this.state.attributeRangeMaxes[i] = supposedMin;
        }
        if (supposedMin === supposedMax) this.state.attributeRangeMins[i] = String(Number.parseInt(supposedMin, 10) - 0.1);
      }
    }
  }

  // get attribute name + type!
  buildAttributeNameAndTypeLists = () => {
    for (let i = 0; i < Object.keys(this.state.attributeNameDict).length; i += 1) {
      this.state.attributeNameList.push(this.state.attributeNameDict[i]);
      this.state.attributeTypeList.push(this.state.attributeTypeDict[i]);
    }
  }

  // get range list
  buildAttributeRangeLists = () => {
    for (let i = 0; i < Object.keys(this.state.attributeRangeMinDict).length; i += 1) {
      console.log('building: //');
      console.log(this.state.attributeRangeMinDict[i]);
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

    this.buildAttributeNameAndTypeLists();
    this.buildAttributeRangeLists();
    this.checkValidRanges();

    console.log('names');
    console.log(this.state.attributeNameList);

    putDataset(callback, this.state.datasetName, this.state.appName,
      'bingus', this.state.appCategory, this.state.numUsers,
      this.state.attributeNameList, this.state.attributeTypeList,
      this.state.attributeRangeMins, this.state.attributeRangeMaxes);

    document.getElementById('appNameInput').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('numUsersInput').value = '';

    this.setState({ appName: null });
    this.setState({ appCategory: null });
    this.setState({ datasetName: null });
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
    this.setState({ datasetNameSubmitted: false });
    this.setState({ numUsersSubmitted: false });
    this.setState({ readyOnce: false });

    this.setState({ numUsers: null });
    this.setState({ inputDatatypeFormList: [] });
    this.setState({ attributeRangeInputs: [] });
    this.setState({ attributeTypeSubmitted: 0 });
    this.setState({ readyForSubmit: false });
    this.setState({ readyForRanges: false });
    this.setState({ readyForRangesButton: false });
    this.setState({ addAttributeForms: true });
    this.setState({ finalRangesEntered: false });
    console.log('put!');
    // window.location.reload(false);
  }

  // change app specified num users, make sure it is a positive integer
  addNumUsers = (event) => {
    if (!Number.isNaN(parseInt(event.target.value, 10)) && parseInt(event.target.value, 10) > 0) {
      console.log('num users submitted');
      this.setState({ numUsers: event.target.value });
      this.setState({ numUsersSubmitted: true });
    } else {
      console.log('num users unsubmitted');
      this.setState({ numUsersSubmitted: false });
    }
  }

  // change app specified category, make sure their category is not None
  addAppCategory = (event) => {
    if (!(event.target.value === '')) {
      if (!(event.target.value === 'None')) {
        console.log('category submitted');
        this.setState({ appCategory: event.target.value });
        this.setState({ categorySubmitted: true });
      } else {
        console.log('category unsubmitted');
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
      console.log('app name submitted');
      this.setState({ appName: event.target.value });
      this.setState({ appNameSubmitted: true });
    } else {
      console.log('app name unsubmitted');
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

  addDatasetName = (event) => {
    if (!(event.target.value === '')) {
      console.log('dataset name submitted');
      this.setState({ datasetName: event.target.value });
      this.setState({ datasetNameSubmitted: true });
    } else {
      console.log('dataset name unsubmitted');
      this.setState({ datasetNameSubmitted: false });
    }
  }

  renderDatasetNameInput = () => {
    if (!this.state.datasetNameSubmitted) {
      return (
        <div>
          <h2>What is your dataset named?</h2>
          <div>
            <input id="nameInput" type="text" placeholder="name" onChange={(e) => this.addDatasetName(e)} />
            <h4><i>invalid - dataset must have a name</i></h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>What is your dataset named?</h2>
          <div>
            <input id="nameInput" type="text" placeholder="name" onChange={(e) => this.addDatasetName(e)} />
            <h4><i><span>&#10003;</span></i></h4>
          </div>
        </div>
      );
    }
  }

  readyForSubmit = () => {
    if (this.state.finalRangesEntered && this.state.numUsersSubmitted && this.state.appNameSubmitted && this.state.datasetNameSubmitted && this.state.categorySubmitted) {
      this.setState({ readyForSubmit: true });
      this.setState({ readyOnce: true });
      console.log('ready!');
    } else {
      this.setState({ readyForSubmit: false });
      console.log('not ready!');
    }
  }

  checkIfRangesReady = () => {
    if ((Object.keys(this.state.attributeRangeMaxDict).length === this.state.attributeRangeInputs.length && !this.state.readyForSubmit) // all our number attributes have ranges
    || ((Object.keys(this.state.attributeTypeDict).length === Number.parseInt(this.state.numAttributes, 10)
    && Object.keys(this.state.attributeNameDict).length === Number.parseInt(this.state.numAttributes, 10)) && this.getNumNumberAttributes() < 1)) {
      console.log('ranges ready');
      this.setState({ finalRangesEntered: true });
    }
  }

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
              <select onChange={(e) => this.addAttributeType(e, i)}>
                <option value="O">None</option>
                <option value="S">String</option>
                <option value="N">Number</option>
                <option value="B">Binary</option>
              </select>
            </div>,
          );
        }
        this.setState({ addAttributeForms: false });
      }
      console.log(this.state.attributeTypeSubmitted);
      console.log(this.state.numAttributes);
      if (this.state.readyForRangesButton) {
        if (Object.keys(this.state.attributeNameDict).length < this.state.numAttributes || Object.keys(this.state.attributeTypeDict).length < this.state.numAttributes
        || this.state.attributeTypeSubmitted < this.state.numAttributes) {
          return (
            <div className="dataLists">
              <div className="typesList">
                <h2>Add Your Attributes</h2>
                {this.state.inputDatatypeFormList}
                <h3><i>Submit attribute names and types to see ranges</i></h3>
              </div>
            </div>
          );
        } else {
          return (
            <div className="dataLists">
              <div className="typesList">
                <h2>Add Your Attributes</h2>
                {this.state.inputDatatypeFormList}
                <button type="submit" className="submit" onClick={() => { this.readyForRanges(); }}>Ranges</button>
              </div>
            </div>
          );
        }
      } else {
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
    if (this.state.finalRangesEntered && this.state.numUsersSubmitted && this.state.appNameSubmitted && this.state.datasetNameSubmitted && this.state.categorySubmitted) {
      console.log('run readyForSubmit()');
      this.readyForSubmit();
    }
  }

  renderAttributeRanges = () => {
    if (this.state.readyForRanges) { // we are ready to render the ranges
      if (this.state.readyForSubmit && this.state.numUsersSubmitted && this.state.appNameSubmitted && this.state.datasetNameSubmitted && this.state.categorySubmitted) { // all ranges have been put in
        console.log('readyForSubmit');
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
        console.log('not ready');
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
  renderNumUsersInput = () => {
    if (!this.state.numUsersSubmitted) { // if number of users hasn't been submitted yet, give invalid message, make sure the number is positive!
      return (
        <div>
          <h2>How many users does this app have?</h2>
          <div>
            <input id="numUsersInput" type="number" onChange={(e) => this.addNumUsers(e)} />
            <h4><i>invalid - must input a positive number of users</i></h4>
          </div>
        </div>
      );
    } else { // number of users submitted, valid
      return (
        <div>
          <h2>How many users does this app have?</h2>
          <div>
            <input id="numUsersInput" type="number" onChange={(e) => this.addNumUsers(e)} />
            <h4><i><span>&#10003;</span></i></h4>
          </div>
        </div>
      );
    }
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    if (!this.state.readyForRangesButton) {
      if (this.state.datasetNameSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted && this.state.numUsersSubmitted) {
        this.setState({ readyForRangesButton: true });
      }
    }
    return (
      <div>
        <h1>Upload Your Data</h1>
        <div>
          {this.renderDatasetNameInput()}
          {this.renderAppNameInput()}
          {this.renderNumUsersInput()}
          {this.renderAppCategory()}
          {this.renderAttributeFields()}
          {this.renderAttributeRanges()}
        </div>
      </div>
    );
  }
}

export default UploadData;
