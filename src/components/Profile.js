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
        console.log(data.Items[0]);
        this.setState({ userData: data.Items[0] });
      }
    };
    getUser(callback, name);
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    console.log(this.state.userData);
    if (this.state.userData) {
      return (
        <div className="profile-page-body">
          <div className="profile-page-user-info">
            <div id="change-profile-info">
              <h3 id="profile-page-user-info-item">Name: {this.state.userData.username.S}</h3>
              <button type="button" onClick={() => this.setState({ usernameChange: true })}>Change!</button>
              {this.renderChangeButton()}
            </div>
            <h3 id="profile-page-user-info-item">Username: {this.state.userData.user_id.S}</h3>
            <h3 id="profile-page-user-info-item">Email: {this.state.userData.user_account_email.S}</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div>nothing yet</div>
      );
    }
  }
}

export default Profile;
