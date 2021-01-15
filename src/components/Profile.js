import React, { Component } from 'react';
import '../style.scss';

/*
Simple component that links to user-specific jupyterhub instance
*/


class Profile extends Component {
    // going to pull together all the kinds of things we want to display
    constructor(props) {
      super(props);
  
      this.state = {
        currentUser: null,
        userType: null,
        userNotSet: true,
        style: {
          width: 0,
        },
      };
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
            this.queryUserModels();
          });
      }
    }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    return (
      <div className="body">
        <h1>Model Upload</h1>
        <a href="https://jupyter.artificien.com/hub/login" title="embedded jupyter" target="_blank" rel="noreferrer">Click here to upload your model</a>
      </div>
    );
  }
}

export default Profile;
