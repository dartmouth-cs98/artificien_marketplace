/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('mounted');
  }

  renderTutorial = () => {
    return (
      <div>
        <h1> Tutorial </h1>
        <div>
          <div className="documentationSidebar">
            <strong><a href="#introduction">Introduction</a></strong>
            <strong><a href="#data-scientist">Data Scientist Demo</a></strong>
            <strong><a href="#app-developer">App Developer Demo</a></strong>
            {/* <a href="#installCocoapods">&nbsp;&nbsp;&nbsp;&nbsp;Install CocoaPods</a> */}
          </div>
          <div className="documentation">

            <h2 id="introduction">Introduction</h2>
            <p>
              This page outlines how to take advantage of Artificien's base tutorial, which consists of a simple
              pre-made model pointing at a pre-made application that stores user health data. As a new user, much
              of Artificien's infrastructure and processes may seem foreign, and this example is designed to demonstrate
              a working federated learning example that you can follow in developing future models or integrating future apps.
            </p>
            <h2 id="data-scientist">Data Scientist Demo</h2>
            <p>
              After creating an account, you will automatically be an owner of a single dataset: Artificien-Mobile. Artificien-Mobile
              is a fake application developed by the Artificien team and distributed via TestFlight. It collects user data
              such as age, step count, and height from the Apple Health app and exposes it to Artificien for model training.
              You can find and explore the app's details in the <NavLink to="/marketplace">Marketplace</NavLink> or in your
              Profile page, where it will be marked as already owned.
            </p>
            <p>
              As a new user, you will also automatically have a model populated in your JupyterHub environment (accessible from
              the <NavLink to="/models">Models</NavLink> page) within a <code>tutorials</code> sub-directory. This python file is
              shared by all Artificien users and cannot be altered. It is pre-designed to train on the health data exposed
              by Artificien-Health, and tested with the sample datasets within the <code>sample_data</code> sub-directory. Please
              read this throughly to understand some of the basics of federated learning with Artificien. You can use this resource
              in conjunction with the <NavLink to="/data_scientist_documentation">Data Scientist Documentation</NavLink> to
              develop strong models.
            </p>
            <a href="https://jupyter.artificien.com/hub/login"><button className="data-card-button" type="button">Go to the Sample Model</button></a>
            <h2 id="app-developer">App Developer Demo</h2>
            <p>
              The other side of the training process is the app itself. Artificien-Mobile is a live application that can
              be downloaded by anyone willing to share their health data for the sake of this federated learning example.
              The app is distributed through TestFlight. Our source code for the application is also entirely open-source,
              so that App Developers can see how the Artificien CocoaPod is implemented in practice. Use this example in
              conjunction with the <NavLink to="/app_developer_documentation">App Developer Documentation</NavLink> to
              understand how to share your data securely with Artificien.
            </p>
            <a href="https://testflight.apple.com/join/Z6FKIuIw"><button className="data-card-button" type="button">Download the App</button></a>
            <a href="https://github.com/dartmouth-cs98/artificien_ios"><button className="data-card-button" type="button">App Source Code</button></a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>{this.renderTutorial()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

// export default withRouter(withAuthenticator(Navbar)); // might be some sort of login flow thing here
export default withRouter(connect(mapStateToProps)(Tutorial)); // might be some sort of login flow thing here
