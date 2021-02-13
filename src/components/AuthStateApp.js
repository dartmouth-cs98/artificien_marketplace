import React, { Component } from 'react';
import {
  AmplifySignOut, AmplifySignIn, AmplifySignUp,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import '../style.scss';

class AuthStateApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authState: null,
      user: null,
    };
  }

  componentDidMount() {
    onAuthUIStateChange((nextAuthState, authData) => {
      this.setState({ authState: nextAuthState });
      this.setState({ user: authData });
    });
  }

  componentDidUpdate() {
    onAuthUIStateChange((nextAuthState, authData) => {
      this.setState({ authState: nextAuthState });
      this.setState({ user: authData });
    });
  }

  render() {
    if (this.state.authState === AuthState.SignedIn && this.state.user) {
      return (
        <div className="App">
          <div>Hello, {this.state.user}</div>
          <AmplifySignOut />
        </div>
      );
    } else if (this.props.signin) {
      return (
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
      );
    } else {
      return (
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: 'email',
              label: 'email',
              placeholder: 'xxxxxxxxx@yyyy.com',
              required: true,
            },
            {
              type: 'password',
              label: 'Password',
              placeholder: '*************',
              required: true,
            },
            {
              type: 'phone_number',
              label: 'phone number',
              placeholder: 'XXX-XXX-XXXX',
              required: true,
            },
            {
              type: 'role',
              label: 'role',
              placeholder: ' \'Developer\' or \'Client\'',
              required: true,
            },
          ]}
        />
      );
    }
  }
}

export default AuthStateApp;
