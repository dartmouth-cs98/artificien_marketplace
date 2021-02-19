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
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
      );
    } else {
      return (
        <AmplifyAuthenticator>
          <AmplifySignUp />
          <AmplifyConfirmSignUp />
        </AmplifyAuthenticator>
      // slot="sign-up"
      // usernameAlias="email"
      // formFields={[
      //   {
      //     type: 'email',
      //     label: 'email',
      //     placeholder: 'xxxxxxxxx@yyyy.com',
      //     required: true,
      //   },
      //   {
      //     type: 'password',
      //     label: 'Password',
      //     placeholder: '*************',
      //     required: true,
      //   },
      //   {
      //     type: 'phone_number',
      //     label: 'phone number',
      //     placeholder: 'XXX-XXX-XXXX',
      //     required: true,
      //   },
      //   {
      //     type: 'role',
      //     label: 'role',
      //     placeholder: ' \'0\' for client or \'1\' for developer',
      //     required: true,
      //   },
      // ]}
      );
    }
  }
}

export default AuthStateApp;
