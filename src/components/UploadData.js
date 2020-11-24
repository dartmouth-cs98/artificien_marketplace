/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { putDataset } from '../databaseCalls';

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
      readyForRangesButton: false,
      readyForRanges: false,
      addAttributeForms: true,
      readyForSubmit: false,
      finalRangesEntered: false,

      attributeNameList: [],
      attributeTypeList: [],
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

  numAttributesOnChange = (event) => {
    this.setState({ numAttributes: event.target.value });
  }

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

  addAttributeRangeMin = (event, i) => {
    console.log(event.target.value);
    console.log(i);
    // this.state.attributeRangeMins.push({ S: event.target.value });
    this.state.attributeRangeMinDict[i] = { S: event.target.value };
  }

  addAttributeRangeMax = (event, i) => {
    console.log(event.target.value);
    // this.state.attributeRangeMaxes.push({ S: event.target.value });
    this.state.attributeRangeMaxDict[i] = { S: event.target.value };
    this.setState({ addAttributeForms: false });
  }

  addAttributeType = (event, i) => {
    console.log(event.target.value);
    this.state.attributeTypeDict[i] = { S: event.target.value }; // { indexOfInput : Type }
    this.setState({ addAttributeForms: false });
  }

  getNumNumberAttributes = () => {
    let numNumAttributes = 0;
    for (const key in this.state.attributeTypeDict) {
      if (this.state.attributeTypeDict[key].S === 'N') numNumAttributes += 1;
    }
    return numNumAttributes;
  }

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

  buildAttributeNameAndTypeLists = () => {
    for (let i = 0; i < Object.keys(this.state.attributeNameDict).length; i += 1) {
      this.state.attributeNameList.push(this.state.attributeNameDict[i]);
      this.state.attributeTypeList.push(this.state.attributeTypeDict[i]);
    }
  }

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

    this.setState({ numUsers: null });
    this.setState({ inputDatatypeFormList: [] });
    this.setState({ attributeRangeInputs: [] });
    this.setState({ readyForSubmit: false });
    this.setState({ readyForRanges: false });
    this.setState({ readyForRangesButton: false });
    this.setState({ addAttributeForms: true });
    this.setState({ finalRangesEntered: false });
    console.log('put!');
    // window.location.reload(false);
  }

  addNumUsers = (event) => {
    console.log(event.target.value);
    if (!Number.isNaN(parseInt(event.target.value, 10))) {
      console.log('num users submitted');
      this.setState({ numUsers: event.target.value });
    }
  }

  addAppCategory = (event) => {
    console.log('category submitted');
    this.setState({ appCategory: event.target.value });
    this.setState({ categorySubmitted: true });
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
            <h4><i>Valid app category!</i></h4>
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
            <h4><i>Valid app name!</i></h4>
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
            <h4><i>Valid dataset name!</i></h4>
          </div>
        </div>
      );
    }
  }

  readyForSubmit = () => {
    this.setState({ readyForSubmit: true });
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
      if (this.state.readyForRangesButton) {
        if (Object.keys(this.state.attributeNameDict).length < this.state.numAttributes || Object.keys(this.state.attributeTypeDict).length < this.state.numAttributes) {
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
                <button type="submit" onClick={() => { this.readyForRanges(); }}>Ranges</button>
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
    if (this.state.finalRangesEntered) {
      console.log('run readyForSubmit()');
      this.readyForSubmit();
    }
  }

  renderAttributeRanges = () => {
    if (this.state.readyForRanges) { // we are ready to render the ranges
      if (this.state.readyForSubmit) { // all ranges have been put in
        console.log('readyForSubmit');
        if (this.getNumNumberAttributes() < 1) {
          return (
            <div>
              <h4><i>No number type fields, please submit</i></h4>
              <button type="submit" onClick={() => { this.submitAttributes(); }}>Submit</button>
            </div>
          );
        }
        return (
          <div>
            <h4><i>Ranges entered, please submit dataset</i></h4>
            <button type="submit" onClick={() => { this.submitAttributes(); }}>Submit</button>
          </div>
        );
      } else {
        this.checkForSubmit();
        return (
          <div>
            {this.state.attributeRangeInputs}
            <button type="button" onClick={() => this.checkIfRangesReady()}>Submit Ranges</button>
          </div>
        );
      }
    } else {
      return (
        <div>
          {this.stateattributeRangeInputs}
        </div>
      );
    }
  }

  renderNumUsersInput = () => {
    return (
      <div>
        <h2>How many users does this app have?</h2>
        <div>
          <input id="numUsersInput" type="number" onChange={(e) => this.addNumUsers(e)} />
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.readyForRangesButton) {
      if (this.state.datasetNameSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted) {
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
