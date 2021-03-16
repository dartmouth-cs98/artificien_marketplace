/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
// import update from 'react-addons-update'; // ES6
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { putDataset, getDataset, purchaseDataset } from '../database/databaseCalls';

// import { Button } from 'reactstrap';

class RegisterApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: null,
      nameIsUnique: false,
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
      intermediateRangesEntered: false, // concept that if the ranges are valid, we can show the submit ranges button. otherwise we do not show it
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

  // ensure the attribute name does not become empty, or at least we know when it does so the dataset cannot be submmited
  isemptyAttributeName = () => {
    console.log(this.state.attributeNameDict);
    for (let i = 0; i < Object.keys(this.state.attributeNameDict).length; i += 1) {
      if (this.state.attributeNameDict[i].S === '') return true;
    }
    return false;
  }

  // add a description
  addAttributeDescription = (event, i) => {
    this.setState((state) => {
      // eslint-disable-next-line no-param-reassign
      state.attributeDescriptionDict[i] = { S: event.target.value };
      return {
        ...state,
      };
    });
  }

  // same thing as ensuring attribute name not empty - if the user fills out the form, then makes it blank again, we need to make sure they cannot submit it!
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
    // console.log(this.state.attributeRangeMinDict);
    // console.log('min');
    // whenever you are changing the min, check if the range is valid
    const output = this.checkValidRanges();
    this.setState({ intermediateRangesEntered: output }); // if we have values for min & max and they're genuine, allow the submit ranges button to be shown
    console.log(event.target.value);
    // console.log(this.state.intermediateRangesEntered);
  }

  // set the range maximum to the value (stringify); same concept as above
  // what is done here is it calls checkvalidranges which makes sure that min/max exist for every attribute
  // if this is the case, then we show the user the submit ranges button - it goes away if the ranges become no longer valid
  addAttributeRangeMax = (event, i) => {
    // this.state.attributeRangeMaxes.push({ S: event.target.value });
    this.state.attributeRangeMaxDict[i] = { S: event.target.value };
    this.setState({ addAttributeForms: false });
    // console.log('max');
    const output = this.checkValidRanges();
    this.setState({ intermediateRangesEntered: output });
    console.log(event.target.value);
    // console.log(this.state.intermediateRangesEntered);
  }

  // make sure that the attribute type is NOT none!
  // if you are changing to a type AND it is either from none OR it is none of the existing types (i.e. it hasn't been made yet!)
  // high level - makes sure you have inputted a legit type for each attribute, really it makes sure that you cannot change it back to 'select' and still submit
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

  // count number of attributes with number; this allows us to figure out how many range min/max rows we need to show!
  getNumNumberAttributes = () => {
    let numNumAttributes = 0;
    for (const key in this.state.attributeTypeDict) {
      if (this.state.attributeTypeDict[key].S === 'N') numNumAttributes += 1;
    }
    return numNumAttributes;
  }

  // make sure max > min!
  // returns if we have valid ranges or not, which determines whether the submit ranges button is shown
  checkValidRanges = () => {
    const numNumberAttributes = this.getNumNumberAttributes();
    console.log('yes');

    // this goes through, if max > min OR one of them is NaN (i.e. empty, not a number), return false, this makes sure you cannot submit ranges
    if (numNumberAttributes > 0) {
      for (let i = 0; i < numNumberAttributes; i += 1) {
        console.log('iterating');
        if (this.state.attributeRangeMinDict[i] && this.state.attributeRangeMaxDict[i]) {
          console.log('in the beast');
          const supposedMin = this.state.attributeRangeMinDict[i];
          const supposedMax = this.state.attributeRangeMaxDict[i];
          // this ensures min < max, and that both exist (NaN is what happens if the user changes the form box back to blank, which is NOT allowed!)
          if ((Number.parseInt(supposedMin.S, 10) > Number.parseInt(supposedMax.S, 10)) || (Number.isNaN(Number.parseInt(supposedMin.S, 10))) || (Number.isNaN(Number.parseInt(supposedMax.S, 10)))) {
            console.log('oooo no');
            return false;
          }
        } else {
          console.log('not good enough');
          return false;
        }
      }
      console.log('ranges entered!');
      return true;
    } else {
      return false;
    }
  }

  // get attribute name + type! in a simpler data structure
  buildAttributeNameAndTypeAndDescriptionLists = () => {
    for (let i = 0; i < Object.keys(this.state.attributeNameDict).length; i += 1) {
      this.state.attributeNameList.push(this.state.attributeNameDict[i]);
      this.state.attributeTypeList.push(this.state.attributeTypeDict[i]);
      this.state.attributeDescriptionList.push(this.state.attributeDescriptionDict[i]);
    }
  }

  // get range list in a simpler datastructure
  buildAttributeRangeLists = () => {
    for (let i = 0; i < Object.keys(this.state.attributeRangeMinDict).length; i += 1) {
      this.state.attributeRangeMins.push(this.state.attributeRangeMinDict[i]);
      this.state.attributeRangeMaxes.push(this.state.attributeRangeMaxDict[i]);
    }
  }

  // when we have everything correctly inputted by the user, this puts the dataset into the DB, and resets all variables
  submitAttributes = async () => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };

    this.buildAttributeNameAndTypeAndDescriptionLists();
    this.buildAttributeRangeLists();
    // this.checkValidRanges();
    console.log(this.props);

    // including the app url
    putDataset(callback, this.state.appName,
      this.state.appCategory, this.state.appURL,
      this.state.attributeNameList, this.state.attributeTypeList,
      this.state.attributeRangeMins, this.state.attributeRangeMaxes, this.state.attributeDescriptionList,
      this.state.currentUser);

    document.getElementById('appNameInput').value = '';
    document.getElementById('appURLInput').value = '';

    purchaseDataset(this.state.appName, this.state.currentUser, 0);

    this.setState({ appName: null });
    this.setState({ appCategory: null });
    this.setState({ numAttributes: null });
    this.setState({ attributeNameList: [] });
    this.setState({ attributeNameDict: {} });

    this.setState({ attributeTypeList: [] });
    this.setState({ attributeTypeDict: {} });

    this.setState({ attributeRangeMins: [] });
    this.setState({ attributeRangeMinDict: {} });
    this.setState({ intermediateRangesEntered: false });

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

  // taking in all categories shown in app store, will show a check if you have submitted it, otherwise, says to select a category
  renderAppCategory = () => {
    if (!this.state.categorySubmitted) {
      return (
        <div>
          <h2>App Category</h2>
          <div>
            <div>
              <select id="categoryInput" value={this.state.appCategory} onChange={(e) => this.addAppCategory(e)}>
                <option value="None">None</option>
                <option value="Medical/Health">Medical/Health</option>
                <option value="Navigation/Location">Navigation/Location</option>
                <option value="Music/Media">Music/Media</option>
                <option value="News">News</option>
                <option value="Financial/Shopping">Financial/Shopping</option>
                <option value="Lifestyle/Social">Lifestyle/Social</option>
                <option value="Gaming">Gaming</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <h4><i>Please select a category</i></h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>App Category</h2>
          <div>
            <div>
              <select onChange={(e) => this.addAppCategory(e)}>
                <option value="None">None</option>
                <option value="Medical/Health">Medical/Health</option>
                <option value="Navigation/Location">Navigation/Location</option>
                <option value="Music/Media">Music/Media</option>
                <option value="News">News</option>
                <option value="Financial/Shopping">Financial/Shopping</option>
                <option value="Lifestyle/Social">Lifestyle/Social</option>
                <option value="Gaming">Gaming</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <h4><i><span>&#10003;</span></i></h4>
          </div>
        </div>
      );
    }
  }

  // adding the app name - will not allow you to have a blank app name!
  addAppName = (event) => {
    this.setState({ nameIsUnique: false });
    if (!(event.target.value === '')) {
      this.setState({ appName: event.target.value });
      this.setState({ appNameSubmitted: true });
    } else {
      this.setState({ appNameSubmitted: false });
    }
  }

  // make sure there are not two apps with the same name, will cause lots of problems if there are
  checkNameUnique = (name) => {
    const callback = (success, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
        if (success.Item) {
          this.setState({ nameIsUnique: false });
        } else {
          this.setState({ nameIsUnique: true });
        }
      }
    };
    getDataset(callback, name);
  }

  renderAppNameInput = () => {
    if (!this.state.appNameSubmitted) {
      return (
        <div>
          <h2>App Name</h2>
          <div>
            <input id="appNameInput" type="text" placeholder="name" onChange={(e) => this.addAppName(e)} />
            <h4><i>Your app must have a unique name</i></h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>App Name</h2>
          <div>
            <input id="appNameInput" type="text" placeholder="name" onChange={(e) => this.addAppName(e)} />
            <button type="button" onClick={() => this.checkNameUnique(this.state.appName)}>Confirm</button>
            {this.state.nameIsUnique ? <h4><i><span>&#10003;</span></i></h4> : <h4><i>Please use a unique app name</i></h4>}
          </div>
        </div>
      );
    }
  }

  // the end all be all! makes sure the ranges are entered & submitted, and that the top 3 things are inputted too
  // don't worry about the intermediate attribute forms submitted because you cannot get to ranges unless that has happened
  // readyOnce is a way to handle if at one point everything was ready - super edge case of if user changes the app name or URL after submitting ranges,
  //  need to make sure that they are not allowed to submit
  // and we do not want to take in ranges again so this just changes the error button to "please fix top 3 category"
  readyForSubmit = () => {
    console.log('ready for submit');
    if (this.state.finalRangesEntered && this.state.appURLSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted) {
      console.log('all good here');
      this.setState({ readyForSubmit: true });
      this.setState({ readyOnce: true });
    } else {
      this.setState({ readyForSubmit: false });
    }
  }

  // checks if the ranges have been input correctly, triggered by clicking submit ranges - we know that they will be if you can submit
  checkIfRangesReady = () => {
    if ((Object.keys(this.state.attributeRangeMaxDict).length === this.state.attributeRangeInputs.length && !this.state.readyForSubmit) // all our number attributes have ranges
    || ((Object.keys(this.state.attributeTypeDict).length === Number.parseInt(this.state.numAttributes, 10)
    && Object.keys(this.state.attributeNameDict).length === Number.parseInt(this.state.numAttributes, 10)) && this.getNumNumberAttributes() < 1)) {
      this.setState({ finalRangesEntered: true });
    }
  }

  // renders the range inputs, figures out how many rows you need based on the umber of 'N'
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

  // changed n to float, but keeping it as 'n' for simplicity given the other locations N appears
  renderAttributeFields = () => {
    if (!this.state.numAttributes) {
      return (
        <div>
          <h2>Attributes</h2>
          <label htmlFor="attrNum">Number of Attributes:&nbsp;</label>
          <select id="attrNum" onChange={(e) => this.numAttributesOnChange(e)}>
            <option value="1">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
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
                <option value="O">Select</option>
                <option value="N">Float</option>
              </select>
              <label htmlFor="description">Attribute Description: </label>
              <textarea id="description" rows="3" cols="33" onChange={(e) => this.addAttributeDescription(e, i)} />
            </div>,
          );
        }
        this.setState({ addAttributeForms: false });
      }
      // some complex logic to figure out if we ask for the attribute types and how we ask
      if (!this.state.readyForRanges) {
        // if attribute input forms have been rendered
        if (this.state.readyForRangesButton) {
          if (Object.keys(this.state.attributeNameDict).length < this.state.numAttributes || Object.keys(this.state.attributeTypeDict).length < this.state.numAttributes
          || this.state.attributeTypeSubmitted < this.state.numAttributes // not enough attribute names or not enough attribute types
          || Object.keys(this.state.attributeDescriptionDict).length < this.state.numAttributes // or not enough attribute descriptions
          || this.isEmptyDescription() // a description is empty
          || this.isemptyAttributeName() // an attribute name is empty
          ) { // any
            console.log(this.state.attributeDescriptionDict);
            return (
              <div className="dataLists">
                <div className="typesList">
                  <h2>Add Your Attributes</h2>
                  {this.state.inputDatatypeFormList}
                  <h4><i>Submit nonempty attribute names, types, and descriptions to proceed</i></h4>
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
                <h4><i>Complete all fields to submit this dataset</i></h4>
              </div>
            </div>
          );
        }
      }

      return (
        <div className="dataLists">
          <div className="typesList">
            <h2>Add Your Attributes</h2>
            <h4><i><span>Attributes submitted</span></i></h4>
          </div>
        </div>
      );
    }
  }

  // makes sure these 5 critical thigns are allowed, then sets it to be ready for submit
  checkForSubmit = () => {
    if (this.state.finalRangesEntered && this.state.appURLSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted && this.state.nameIsUnique) {
      this.readyForSubmit();
    }
  }

  renderAttributeRanges = () => {
    if (this.state.readyForRanges) { // we are ready to render the ranges
      if (this.state.readyForSubmit && this.state.appURLSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted && this.state.nameIsUnique) { // all ranges have been put in
        if (this.getNumNumberAttributes() < 1) {
          return (
            <div>
              <h4><i>No number type fields, please submit</i></h4>
              <Link to="/app_developer_documentation" style={{ textDecoration: 'none' }}>
                <button type="submit" className="submit" onClick={() => { this.submitAttributes(); }}>Submit</button>
              </Link>
            </div>
          );
        }
        return (
          <div>
            <h4><i><span>Ranges and all other fields entered correctly: submit this dataset</span></i></h4>
            <Link to="/app_developer_documentation" style={{ textDecoration: 'none' }}>
              <button type="submit" className="submit" onClick={() => { this.submitAttributes(); }}>Submit</button>
            </Link>
          </div>
        );
      } else {
        this.checkForSubmit();
        if (this.state.readyOnce) { // if it at one point was ready, means they messed up one of the top data inputs
          return (
            <div>
              <h4><i>Please complete all of the required fields to submit</i></h4>
            </div>
          );
          // if we have a unique name and the intermediate ranges entered (meaning they are valid ranges), then we can allow them to submit range
        } else if (this.state.nameIsUnique && this.state.intermediateRangesEntered) {
          return (
            <div>
              {this.state.attributeRangeInputs}
              <button type="button" className="submit" onClick={() => this.checkIfRangesReady()}>Submit Ranges</button>
            </div>
          );
          // if intermediate ranges are NOT entered (i.e. the ranges are not valid)
        } else {
          return (
            <div>
              {this.state.attributeRangeInputs}
              <h4><i>Please make sure the min is less than the max in every attribute!</i></h4>
            </div>
          );
        }
      }
    } else {
      console.log('no beans');
      console.log(this.state.nameIsUnique);
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
          <h2>App Store Link</h2>
          <div>
            <input id="appURLInput" type="text" placeholder="https://apps.apple.com" onChange={(e) => this.addAppURL(e)} />
            <h4><i>Please submit a valid URL beginning with https://apps.apple.com...</i></h4>
          </div>
        </div>
      );
    } else { // number of users submitted, valid
      return (
        <div>
          <h2>App Store Link</h2>
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
    // get us ready for the ranges button
    if (!this.state.readyForRangesButton) {
      if (this.state.appNameSubmitted && this.state.categorySubmitted && this.state.appURLSubmitted) {
        this.setState({ readyForRangesButton: true });
      }
    }
    return (
      <>
        <div id="register-app-container">
          <h1>Register App</h1>
          <div>
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  {this.renderAppNameInput()}
                </div>
                <div className="col-lg-4">
                  {this.renderAppURLInput()}
                </div>
                <div className="col-lg-4">
                  {this.renderAppCategory()}
                </div>
              </div>
            </div>
            {/* {this.renderAppNameInput()}
            {this.renderAppURLInput()}
            {this.renderAppCategory()} */}
            {this.renderAttributeFields()}
            {this.renderAttributeRanges()}
          </div>
        </div>
      </>
    );
  }
}

export default RegisterApp;
