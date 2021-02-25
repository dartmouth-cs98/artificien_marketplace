import React, { Component } from 'react';
import '../style.scss';

/*
Simple component that links to user-specific jupyterhub instance
*/

class HowItWorks extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderDataScientists = () => {
    return (
      <div className="body">
        <h1>How Artificien Works: Data Scientists</h1>
        <p>1. They select the dataset they want to purchase from the <i><b>Artificien Marketplace</b></i></p>
        <p>2. They create a new machine learning model using PyTorch in the <i><b>Artificien JupyterHub</b></i></p>
        <p>3. They utilize the <i><b>Artificien Library</b></i> functions that facilitate federated learning smoothly, sending their model directly to devices</p>
        <p>4. They track their progress in the <i><b>Artificien Models</b></i> tab</p>
        <p>5. They download their trained model</p>
      </div>
    );
  }

  renderAppDevs = () => {
    return (
      <div className="body">
        <h1>How Artificien Works: App Developers</h1>
        <p>1. They fill out the <i><b>Artificien Upload</b></i> form, signaling that they have a new dataset to sell access to</p>
        <p>2. They download the <i><b>Artificien Cocoapod</b></i>, connecting their application to <i><b>Artificien Infrastructure</b></i></p>
        <p>3. They profit! Making money whenever a data scientist purchases access to their dataset</p>
      </div>
    );
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    return (
      <div>
        <div>{this.renderDataScientists()}</div>
        <div>{this.renderAppDevs()}</div>
      </div>
    );
  }
}

export default HowItWorks;
