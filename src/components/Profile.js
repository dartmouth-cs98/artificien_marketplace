import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { getUser } from '../database/databaseCalls';
import '../style.scss';

/*
Component that provides the user their information, will allow editing capabilities in the future.
*/

class Profile extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
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
        <div className="body">
          <div>
            <h3>Name: {this.state.userData.username.S}</h3>
            <h3>Username: {this.state.userData.user_id.S}</h3>
            <h3>Email: {this.state.userData.user_account_email.S}</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div>Nothing yet</div>
      );
    }
  }
}

export default Profile;
