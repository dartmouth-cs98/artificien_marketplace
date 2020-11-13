/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { putDataset } from '../databaseCalls';

// import { Button } from 'reactstrap';

class UploadData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: null,
      appNameSubmitted: false,
      appCategory: null,
      categorySubmitted: false,
      datasetName: null,
      datasetNameSubmitted: false,
      readyForButton: false,
      numAttributes: null,
      attributeNameList: [],
      attributeTypeList: [],
      attributeRangeMins: [],
      attributeRangeMaxes: [],
      attributeRangeInputs: [],
      numUsers: null,
      inputDatatypeFormList: [],
      readyForSubmit: false,
      addAttributeForms: true,
      readyForRanges: false,
      numberAttributes: [],
    };
  }

  numAttributesOnChange = (event) => {
    console.log(event.target.value);
    this.setState({ numAttributes: event.target.value });
  }

  addAttributeName = (event, i) => {
    if (event.key === 'Enter') {
      let repeat = false;
      for (let j = 0; j < this.state.attributeNameList.length; j += 1) {
        // console.log(this.state.attributeNameList[i].S);
        if (this.state.attributeNameList[j].S === event.target.value) { repeat = true; }
      }
      if (!repeat) {
        console.log(event.target.value);
        this.state.attributeNameList.push({ S: event.target.value });
        this.setState({ addAttributeForms: false });
      }
    }
  }

  addAttributeRangeMin = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.state.attributeRangeMins.push({ S: event.target.value });
    }
  }

  addAttributeRangeMax = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.state.attributeRangeMaxes.push({ S: event.target.value });
      this.setState({ addAttributeForms: false });
    }
  }

  addAttributeType = (event, i) => {
    console.log(event.target.value);
    if (event.target.value === 'N') {
      this.state.numberAttributes.push(i);
      console.log('range pushed');
      this.state.attributeRangeInputs.push(
        <div className="attribute">
          <h3>{this.state.attributeNameList[i].S}</h3>
          <label className="attrLabel" htmlFor="rangeMin">   Attribute Min: </label>
          <input id="rangeMin" type="number" size="6" onKeyDown={(e) => this.addAttributeRangeMin(e)} />
          <label className="attrLabel" htmlFor="rangeMax">   Attribute Max: </label>
          <input id="rangeMax" type="number" size="6" onKeyDown={(e) => this.addAttributeRangeMax(e)} />
        </div>,
      );
    }
    this.state.attributeTypeList.push({ S: event.target.value });
    this.setState({ addAttributeForms: false });
  }

  submitAttributes = () => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };
    putDataset(callback, this.state.datasetName, this.state.appName,
      'bingus', this.state.appCategory, this.state.numUsers,
      this.state.attributeNameList, this.state.attributeTypeList,
      this.state.attributeRangeMins, this.state.attributeRangeMaxes);

    this.setState({ appName: null });
    this.setState({ appCategory: null });
    this.setState({ datasetName: null });
    this.setState({ numAttributes: null });
    this.setState({ attributeNameList: [] });
    this.setState({ attributeTypeList: [] });
    this.setState({ attributeRangeMins: [] });
    this.setState({ attributeRangeMaxes: [] });
    this.setState({ numUsers: null });
    this.setState({ inputDatatypeFormList: null });
    this.setState({ attributeRangeInputs: [] });
    this.setState({ readyForSubmit: false });
    this.setState({ readyForRanges: false });
    this.setState({ readyForButton: false });
    this.setState({ addAttributeForms: true });
    this.setState({ numberAttributes: [] });
    console.log('put!');
    window.location.reload(false);
  }

  addNumUsers = (event) => {
    console.log(typeof event.target.value);
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
              <select value={this.state.appCategory} onChange={(e) => this.addAppCategory(e)}>
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

  readyForRanges = () => {
    this.setState({ readyForRanges: true });
  }

  renderAttributeFields = () => {
    console.log('renderattributefields');
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
              <input type="text" placeholder="Attribute Name" onKeyDown={(e) => this.addAttributeName(e, i)} />
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
      if (this.state.readyForButton) {
        if (this.state.attributeNameList.length < this.state.numAttributes || this.state.attributeTypeList.length < this.state.numAttributes) {
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
    if ((this.state.attributeRangeMaxes.length === this.state.attributeRangeInputs && !this.state.readyForSubmit) // all our number attributes have ranges
    || ((this.state.attributeTypeList.length === Number.parseInt(this.state.numAttributes, 10) && this.state.attributeNameList.length === Number.parseInt(this.state.numAttributes, 10))
      && this.state.numberAttributes.length < 1)) { // all our types are set but none is a number
      console.log('submit!');
      this.readyForSubmit();
    }
  }

  renderAttributeRanges = () => {
    if (this.state.readyForRanges) {
      console.log('ready');
      if (this.state.readyForSubmit) {
        if (this.state.numberAttributes.length < 1) {
          return (
            <div>
              <h4><i>No number type fields, please submit</i></h4>
              <button type="submit" onClick={() => { this.submitAttributes(); }}>Submit</button>
            </div>
          );
        }
        return (
          <div>
            {this.state.attributeRangeInputs}
            <button type="submit" onClick={() => { this.submitAttributes(); }}>Submit</button>
          </div>
        );
      } else {
        this.checkForSubmit();
        return (
          <div>
            {this.state.attributeRangeInputs}
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
    if (!this.state.readyForButton) {
      if (this.state.datasetNameSubmitted && this.state.appNameSubmitted && this.state.categorySubmitted) {
        this.setState({ readyForButton: true });
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
