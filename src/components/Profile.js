import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Card, Nav, Button } from 'react-bootstrap';
import { getUser } from '../database/databaseCalls';
import '../style.scss';
import ChangeUsernameForm from './ChangeUsernameForm';

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
    };
  }

  // mounting
  componentDidMount() {
    this.getCurrentUser();
  }

  // figure out which user is currently logged in and query their models
  getCurrentUser = () => {
    Auth.currentSession()
      .then((data) => {
        console.log(data);
        const name = data.accessToken.payload.username;
        this.queryUser(name);
        console.log(name);
      });
  }

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

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  // 2 errors rn: cannot print on new lines, struggling to print out the arrays for bank name and number
  render() {
    console.log(this.state.userData);
    if (this.state.userData) {
      return (
        <div className="profile-page-body">
          <div className="profile-page-user-info">
            <div id="change-profile-info">
              <h2 id="profile-page-user-info-item">Name: {this.state.userData.username.S}</h2>
              <button type="button" onClick={() => this.setState({ usernameChange: true })}>Change!</button>
              {this.renderChangeButton()}
            </div>
            <h2 className="profile-page-user-info-item">Username: {this.state.userData.user_id.S}</h2>
            <h2 className="profile-page-user-info-item">Email: {this.state.userData.user_account_email.S}</h2>
            <h2 className="profile-page-user-info-item">Username: {this.state.userData.user_id.S}</h2>
            <h2 className="profile-page-user-info-item">Enterprise: {this.state.userData.enterprise.S}</h2>
            <h2 className="profile-page-user-info-item">Date Joined: {this.state.userData.date_joined.S}</h2>
            <h2 className="profile-page-user-info-item">Bank Name: {this.state.userData.bank_info.bank}</h2>
            <h2 className="profile-page-user-info-item">Bank Number: {this.state.userData.bank_info.bank_number}</h2>
          </div>
          <div className="model-info">
            <h2 className="profile-page-user-info-item">Models Submitted: {this.state.userData.num_models_submitted.N}</h2>
            <h2 className="profile-page-user-info-item">Devices Reached: {this.state.userData.devices_reached.N}</h2>
            <h2 className="profile-page-user-info-item">Average Training Time: {this.state.userData.average_training_days.N} days</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div>Nothing to see here!</div>
      );
    }
  }
}

export default Profile;
