import React, { Component } from 'react';
import '../style.scss';

/*
UPDATE - decided not to user this.
*/

class ChangeUsernameForm extends Component {
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
      if (this.state.newUsername === this.state.newUsernameRepeat) {
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
        <button type="button" className="change-user-data-button" onClick={() => this.submitChange()}>Submit Change</button>
        <div>{this.displaySubmitFeedback()}</div>
      </div>
    );
  }
}

export default ChangeUsernameForm;
