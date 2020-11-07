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
      attributeNameList: [],
      attributeTypeList: [],
      numUsers: null,
      // readyToGo: true,
    };
  }

  numAttributesOnChange = (event) => {
    console.log(event.target.value);
    this.setState({ numAttributes: event.target.value });
  }

  addAttributeName = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.state.attributeNameList.push({ S: event.target.value });
    }
  }

  addAttributeType = (event) => {
    console.log(event.target.value);
    this.state.attributeTypeList.push({ S: event.target.value });
  }

  submitAttributes = () => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };

    console.log('bingus');

    // Use this if we want apps to have categories as well.
    // let appCategory = null;
    // const categoryCallback = (data, error) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('got category');
    //     console.log(data);
    //     appCategory = data.Item.category.S;
    //   }
    // };
    // getApp(categoryCallback, this.state.appName);

    putDataset(callback, this.state.datasetName, this.state.appName, 'bingus', this.state.appCategory, this.state.numUsers, this.state.attributeNameList, this.state.attributeTypeList);
    this.setState({ appName: null });
    this.setState({ appCategory: null });
    this.setState({ datasetName: null });
    this.setState({ numAttributes: null });
    this.setState({ attributeNameList: [] });
    this.setState({ attributeTypeList: [] });
    this.setState({ numUsers: null });
  }

  addDatasetName = (event) => {
    if (event.key === 'Enter') {
      console.log('dataset name submitted');
      this.setState({ datasetName: event.target.value });
    }
  }

  addAppName = (event) => {
    if (event.key === 'Enter') {
      console.log('app name submitted');
      this.setState({ appName: event.target.value });
    }
  }

  addNumUsers = (event) => {
    if (event.key === 'Enter') {
      console.log('num users submitted');
      this.setState({ numUsers: event.target.value });
    }
  }

  addAppCategory = (event) => {
    if (event.key === 'Enter') {
      console.log('category submitted');
      this.setState({ appCategory: event.target.value });
    }
  }

  // startAgain = () => {
  //   this.setState({ readyToGo: true });
  //   this.setState({ datasetSubmitted: false });
  // }

  renderAttributeFields = () => {
    if (!this.state.numAttributes) {
      return (
        <div>
          <label htmlFor="attrNum">Number of Attributes:  </label>
          <select id="attrNum" onChange={(e) => this.numAttributesOnChange(e)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          {/* <input id="numAttributes" type="number" min="2" max="10" placeholder="5" value={this.state.value} onChange={(e) => this.numAttributesOnChange(e)} /> */}
        </div>
      );
    } else {
      const inputDatatypeFormList = [];
      for (let i = 0; i < this.state.numAttributes; i += 1) {
        inputDatatypeFormList.push(
          <div className="attribute">
            <input key={Math.random()} type="text" placeholder="Attribute Name" onKeyDown={(e) => this.addAttributeName(e)} />
            <select onChange={(e) => this.addAttributeType(e)}>
              <option value="O">None</option>
              <option value="S">String</option>
              <option value="N">Number</option>
              <option value="B">Binary</option>
            </select>
          </div>,
        );
      }
      return (
        <div className="dataLists">
          <div className="typesList">
            {inputDatatypeFormList}
            <button type="submit" onClick={() => { this.submitAttributes(); }}>Finish</button>
          </div>
        </div>
      );
    }
  }

  // renderSubmittedScreen = () => {
  //   this.setState({ appName: null });
  //   this.setState({ appCategory: null });
  //   this.setState({ datasetName: null });
  //   this.setState({ numAttributes: null });
  //   this.setState({ attributeNameList: [] });
  //   this.setState({ attributeTypeList: [] });
  //   this.setState({ numUsers: null });

  //   return (
  //     <div>
  //       <h1>Thank you for submitting your dataset</h1>
  //       <button type="submit" onClick={this.startAgain()}> Start Again</button>
  //     </div>
  //   );
  // }

  render() {
    // if (this.state.datasetSubmitted) {
    //   console.log('wowoweewow');
    //   return (
    //     <div>
    //       {this.renderSubmittedScreen()}
    //     </div>
    //   );
    // }
    return (
      <div>
        <h1>Upload Your Data</h1>
        <div>
          <h2>What is your dataset named?</h2>
          <div>
            <input id="nameInput" type="text" placeholder="name" onKeyDown={(e) => this.addDatasetName(e)} />
          </div>
          <h2>What is your app named?</h2>
          <div>
            <input id="appNameInput" type="text" placeholder="name" onKeyDown={(e) => this.addAppName(e)} />
          </div>
          <h2>How many users does this app have?</h2>
          <div>
            <input id="numUsersInput" type="text" placeholder="name" onKeyDown={(e) => this.addNumUsers(e)} />
          </div>
          <h2>What category is your app in?</h2>
          <div>
            <input id="categoryInput" type="text" placeholder="name" onKeyDown={(e) => this.addAppCategory(e)} />
          </div>
          <h2>Add Your Attributes</h2>
          <div>
            {this.renderAttributeFields()}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadData;
