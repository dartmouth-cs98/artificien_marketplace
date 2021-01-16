import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { getUser } from '../databaseCalls';
import '../style.scss';

/*
Component that provides the user their information, will allow editing capabilities in the future.
*/

class Profile extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      userNotSet: true,
      userData: null,
    };
  }

  // mounting
  componentDidMount() {
    // console.log('hi');
    const callbackMount = (successData, error) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ userData: successData }); // display all datasets in db as catalog
        console.log(successData);
      }
    };
    getUser(callbackMount);
  }

    // figure out which user is currently logged in and query their models
    getCurrentUser = () => {
      if (this.state.userNotSet) {
        Auth.currentSession()
          .then((data) => {
            console.log(data);
            console.log(data.accessToken.payload.username);
            this.setState({ currentUser: data.accessToken.payload.username });
            this.setState({ userNotSet: false });
            this.queryUser();
          });
      }
    }

  // even if user revisiting page, must re-query their information
  queryUser = () => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ userData: data });
      }
    };
    getUser(callback, this.state.currentUser.toLowerCase());
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    console.log(this.state);
    return (
      <div className="body">
        <div>
          <h3>Name: {this.state.userData.name}</h3>
          <h3>Username: {this.state.userData.user_id}</h3>
          <h3>Email: {this.state.userData.user_account_email}</h3>
          <h3>Enterprise: {this.state.userData.enterprise}</h3>
        </div>
      </div>
    );
  }
}

export default Profile;
