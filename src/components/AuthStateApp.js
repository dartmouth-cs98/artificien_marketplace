import React, { Component } from 'react';
import {
  AmplifySignUp, AmplifyConfirmSignUp, AmplifyAuthenticator,
} from '@aws-amplify/ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
      this.props.history.push('/');
      window.location.reload(false);
      return (
        <div>
          Signing You In...
          <LoadingScreen />
        </div>
      );
    }
    return (
      <div style={{ margin: '10px' }}>
        <AmplifyAuthenticator className="amplifyAuth">
          <AmplifySignUp />
          <AmplifyConfirmSignUp />
        </AmplifyAuthenticator>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
    open: state.modalReducer.open,
  };
};

export default withRouter(connect(mapStateToProps)(AuthStateApp));
