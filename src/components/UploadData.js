/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { putDataset } from '../database/databaseCalls';

/*
Large component that allows users to describe the dataset their app has to offer
Triggers the launching of various lambdas, one of which creates a "mock" dataset with dummy values as described by the user
This dataset can then be used by the developer in jupyterhub to train and optimize a model
*/
class UploadData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Content variables - what is the user inputting?
      appName: null,
      appCategory: null,
      datasetName: null,
      numAttributes: null,
      numUsers: null,

      // Progress booleans - how far along is the user?
      // determine what is displayed
      appNameSubmitted: false,
      categorySubmitted: false,
      datasetNameSubmitted: false,
      readyForSubmit: false,

    };
  }

  // number of attributes dropdown menu is changed
  numAttributesOnChange = (event) => {
    this.setState({ numAttributes: event.target.value });
  }

  // consolidate variant dictionary inputs of names and types into strict lists
  buildAttributeNameAndTypeLists = () => {
    for (let i = 0; i < Object.keys(this.state.attributeNameDict).length; i += 1) {
      this.state.attributeNameList.push(this.state.attributeNameDict[i]);
      this.state.attributeTypeList.push(this.state.attributeTypeDict[i]);
    }
    // put entry into database
    putDataset(callback, this.state.datasetName, this.state.appName,
      'bingus', this.state.appCategory, this.state.numUsers);

    // reset form values to null for next dataset upload
    document.getElementById('appNameInput').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('numUsersInput').value = '';

    // -------------------- reset all state variables --------------------

    // content values
    this.setState({ appName: null });
    this.setState({ appCategory: null });
    this.setState({ datasetName: null });
    this.setState({ numUsers: null });

    // progress booleans
    this.setState({ readyForSubmit: false });
    this.setState({ appNameSubmitted: false });
    this.setState({ categorySubmitted: false });
    this.setState({ datasetNameSubmitted: false });

    // window.location.reload(false); // optional force page reload, ugly
  }

  // change app specified num users
  addNumUsers = (event) => {
    if (!Number.isNaN(parseInt(event.target.value, 10))) {
      this.setState({ numUsers: event.target.value });
    }
  }

  // change app specified category
  addAppCategory = (event) => {
    console.log('category submitted');
    this.setState({ appCategory: event.target.value });
    this.setState({ categorySubmitted: true });
  }

  // change app specified name
  addAppName = (event) => {
    if (!(event.target.value === '')) {
      console.log('app name submitted');
      this.setState({ appName: event.target.value });
      this.setState({ appNameSubmitted: true });
    } else {
      this.setState({ appNameSubmitted: false });
    }
  }

  // change dataset specified name
  addDatasetName = (event) => {
    if (!(event.target.value === '')) {
      console.log('dataset name submitted');
      this.setState({ datasetName: event.target.value });
      this.setState({ datasetNameSubmitted: true });
    } else {
      this.setState({ datasetNameSubmitted: false });
    }
  }

  // fully ready to submit dataset
  readyForSubmit = () => {
    this.setState({ readyForSubmit: true });
  }

  // --------------------------------- RENDER METHODS --------------------------------- //

  // render number of users to input
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

  renderAppCategory = () => {
    if (!this.state.categorySubmitted) { // if category hasn't been submitted yet, give invalid message
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
    } else { // category submitted, valid
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

  renderAppNameInput = () => {
    if (!this.state.appNameSubmitted) { // if app name hasn't been submitted yet, give invalid message
      return (
        <div>
          <h2>What is your app named?</h2>
          <div>
            <input id="appNameInput" type="text" placeholder="name" onChange={(e) => this.addAppName(e)} />
            <h4><i>invalid - app must have a name</i></h4>
          </div>
        </div>
      );
    } else { // app name submitted, valid
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

  renderDatasetNameInput = () => {
    if (!this.state.datasetNameSubmitted) { // if dataset name hasn't been submitted yet, give invalid message
      return (
        <div>
          <h2>What is your dataset named?</h2>
          <div>
            <input id="nameInput" type="text" placeholder="name" onChange={(e) => this.addDatasetName(e)} />
            <h4><i>invalid - dataset must have a name</i></h4>
          </div>
        </div>
      );
    } else { // dataset name submitted, valid
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

  // annoying wrapper on ready to submit
  checkForSubmit = () => {
    if (this.state.finalRangesEntered) {
      this.readyForSubmit();
    }
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    return (
      <div>
        <h1>Upload Your Data</h1>
        <div>
          {this.renderDatasetNameInput()}
          {this.renderAppNameInput()}
          {this.renderNumUsersInput()}
          {this.renderAppCategory()}
        </div>
      </div>
    );
  }
}

export default UploadData;
