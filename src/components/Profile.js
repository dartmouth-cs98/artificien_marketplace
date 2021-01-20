import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Card, Nav, Button } from 'react-bootstrap';
import { getUser, queryModels } from '../database/databaseCalls';
import '../style.scss';
import ChangeUsernameForm from './ChangeUsernameForm';
import UserMetricsCard from './UserMetricsCard';

/*
Component that provides the user their information, will allow editing capabilities in the future.
*/

class Profile extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      usernameChange: false,
      userModels: null,
    };
  }

  // mounting
  componentDidMount() {
    Auth.currentSession()
      .then((data) => {
        console.log(data);
        const name = data.accessToken.payload.username;
        this.queryUser(name);
        const modelsQueryCallback = (success, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
            this.setState({ userModels: success });
          }
        };
        queryModels(modelsQueryCallback, name);
      });
    // get metrics here

    // metric 1: Models created
    // get current user username,
    // query models table on 'owner', return a list of all models they've made
    // length of list is first metric.

    // metric 2: Devices reached
    // metric 3: Average training time
  }

  // figure out which user is currently logged in and query their models

  renderChangeButton = () => {
    if (this.state.usernameChange) {
      return <ChangeUsernameForm />;
    }
    return null;
  }

  // even if user revisiting page, must re-query their information
  queryUser = (name) => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        console.log(data.Items[0]);
        this.setState({ userData: data.Items[0] });
      }
    };
    getUser(callback, name);
  }

  renderNumModels = () => {
    if (this.state.userModels) {
      return (
        // <div>Number of models created: {this.state.userModels.Items.length}</div>
        <UserMetricsCard numModels={this.state.userModels.Items.length} username={this.state.userData.username.S} />
      );
    } else {
      return null;
    }
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  // 2 errors rn: cannot print on new lines, struggling to print out the arrays for bank name and number
  render() {
    console.log(this.state.userData);
    if (this.state.userData && this.state.userModels) {
      return (
        <>
          <div className="profile-page-user-info-body">
            <div className="profile-page-user-info">
              <div id="change-profile-info">
                <h3 id="profile-page-user-info-item">Name: {this.state.userData.username.S}</h3>
                <button type="button" className="change-user-data-button" onClick={() => this.setState({ usernameChange: true })}>Change</button>
                {this.renderChangeButton()}
              </div>
              <h3 id="profile-page-user-info-item">Username: {this.state.userData.user_id.S}</h3>
              <h3 id="profile-page-user-info-item">Email: {this.state.userData.user_account_email.S}</h3>
              <h2 id="profile-page-user-info-item">Enterprise: {this.state.userData.enterprise.S}</h2>
              <h2 id="profile-page-user-info-item">Date Joined: {this.state.userData.date_joined.S}</h2>
              <h2 id="profile-page-user-info-item">Bank Name: {this.state.userData.bank_info.bank}</h2>
              <h2 id="profile-page-user-info-item">Bank Number: {this.state.userData.bank_info.bank_number}</h2>
            </div>
          </div>
          <div className="profile-page-user-metrics-body">
            <div className="user-metric-container">{this.renderNumModels()}</div>
          </div>
        </>
      );
    } else {
      return (
        <div>Nothing to see here!</div>
      );
    }
  }
}

export default Profile;
