/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { putDataset } from '../database/databaseCalls';
import '../style.scss';

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
      numUsers: null,

      // Progress booleans - how far along is the user?
      // determine what is displayed
      appNameSubmitted: false,
      categorySubmitted: false,
      numUsersSubmitted: false,
      datasetNameSubmitted: false,

    };
  }

  // Finally put all attributes in database
  submitDataset = () => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };

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
    this.setState({ appNameSubmitted: false });
    this.setState({ categorySubmitted: false });
    this.setState({ numUsersSubmitted: false });
    this.setState({ datasetNameSubmitted: false });

    // window.location.reload(false); // optional force page reload, ugly
  }

  // change app specified num users, make sure it is a positive integer
  addNumUsers = (event) => {
    if (!Number.isNaN(parseInt(event.target.value, 10)) && parseInt(event.target.value, 10) > 0) {
      this.setState({ numUsers: event.target.value });
      this.setState({ numUsersSubmitted: true });
    } else {
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
        this.setState({ appCategory: event.target.value });
        this.setState({ categorySubmitted: false });
      }
    } else {
      this.setState({ categorySubmitted: false });
    }
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

  // --------------------------------- RENDER METHODS --------------------------------- //

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
            <h4><i><span>&#10003;</span></i></h4>
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
            <h4><i><span>&#10003;</span></i></h4>
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
            <h4><i><span>&#10003;</span></i></h4>
          </div>
        </div>
      );
    }
  }

  // make sure they have submitted all things we require, button both guides them to tutorials
  renderSubmit = () => {
    if (this.state.categorySubmitted && this.state.appNameSubmitted && this.state.datasetNameSubmitted && this.state.numUsersSubmitted) { // we are ready to submit the data!
      return (
        <div>
          <NavLink to="/tutorials">
            <button type="button" className="submit" onClick={() => { this.submitDataset(); }}>Submit</button>
          </NavLink>
        </div>
      );
    } else {
      return (null
      );
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
          {this.renderSubmit()}
        </div>
      </div>
    );
  }
}

export default UploadData;
