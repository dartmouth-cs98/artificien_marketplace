import React, { Component } from 'react';
import {
  AmplifySignIn, AmplifySignUp, AmplifyConfirmSignUp, AmplifyAuthenticator,
} from '@aws-amplify/ui-react';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import LoadingScreen from '../UtilityComponents/LoadingScreen';
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
    if (document.getElementsByTagName('amplify-authenticator')[0]) {
      const target = document.getElementsByTagName('amplify-authenticator')[0].shadowRoot;
      setTimeout(() => {
        (target?.children[0]).style.minHeight = '600px';
      }, 50);
    }

    if (this.state.authState === AuthState.SignedIn && this.state.user) {
      window.location.reload(false);
      return (
        <div>
          Signing You In...
          <LoadingScreen />
        </div>
      );
    }
    if (this.props.signin) {
      return (
        <div style={{ color: 'red', margin: '10px' }}>
          <AmplifySignIn slot="sign-in" usernameAlias="email" />
        </div>
      );
    } else {
      return (
        <div style={{ color: 'red', margin: '10px' }}>
          <AmplifyAuthenticator className="amplifyAuth">
            <AmplifySignUp
              slot="sign-up"
              formFields={[
                {
                  type: 'username',
                  label: 'username',
                  placeholder: '',
                  required: true,
                },
                {
                  type: 'password',
                  label: 'Password (must be 8 characters)',
                  placeholder: '*************',
                  required: true,
                },
                {
                  type: 'email',
                  label: 'email',
                  placeholder: 'xxxxxxx@yyyyy.com',
                  required: true,
                },
                {
                  type: 'phone_number',
                  label: 'phone number',
                  placeholder: '(000)000-0000',
                  required: true,
                },
                {
                  type: 'custom:Role',
                  label: 'Role',
                  placeholder: ' \'0\' for client or \'1\' for developer',
                  required: true,
                },
              ]}
            />
            <AmplifyConfirmSignUp />
          </AmplifyAuthenticator>
        </div>
      );
    }
  }
}

export default AuthStateApp;
