import React, { Component } from 'react';
// import { Auth } from 'aws-amplify';
// import { getUser } from '../database/databaseCalls';
import '../style.scss';

class ChangeUsernameForm extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
      newUsername: null,
      newUsernameRepeat: null,
      readyToSubmit: false,
    };
  }

  usernameOnChange = (event) => {
    this.setState({ newUsername: event.target.value });
  }

  usernameRepeatOnChange = (event) => {
    this.setState({ newUsernameRepeat: event.target.value });
  }

  submitChange = () => {
    if (this.state.newUsername && this.state.newUsernameRepeat) {
      console.log('username changes submitted');
      if (this.state.newUsername === this.state.newUsernameRepeat) {
        console.log('replacing in DB!');
        this.setState({ readyToSubmit: true });
      }
    }
  }

  displaySubmitFeedback = () => {
    if (!this.state.readyToSubmit) {
      return <p>Usernames must be the same</p>;
    } else {
      return <p>Thank you!</p>;
    }
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    return (
      <div className="username-input">
        <input type="text" className="username-input-form" onChange={(e) => this.usernameOnChange(e)} placeholder="New Username" />
        <input type="text" className="username-input-form" onChange={(e) => this.usernameRepeatOnChange(e)} placeholder="Repeat New Username" />
        <button type="button" onClick={() => this.submitChange()}>Submit Change</button>
        <div>{this.displaySubmitFeedback()}</div>
      </div>
    );
  }
}

export default ChangeUsernameForm;
