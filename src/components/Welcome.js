/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { connect } from 'react-redux';
import {
  getUser,
} from '../database/databaseCalls';
import { addRole } from '../store/reducers/role-reducer';
// import LoadingScreen from '../UtilityComponents/LoadingScreen';
import HomepageAnimation from '../UtilityComponents/HomepageAnimation';
import ErrorModal from '../UtilityComponents/Modal';
import welcomePageStyles from '../styles/stylesDict';
import AuthStateApp from './AuthStateApp';

// welcome variable on homepage

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      askedForSignIn: false,
      askedForSignUp: false,
      faded: 0,
      isSignedIn: false,
    };
  }

  componentDidMount() {
    // if logged in...
    this.checkAuth();
  }

  checkAuth() {
    if (!this.state.isSignedIn) {
      console.log('auth');
      Auth.currentSession()
        .then((data) => {
          this.setState({ isSignedIn: true });
          const name = data.accessToken.payload.username;
          // console.log(name);
          const callback = (successData, error) => { // requires current user to be in database
            if (error) {
              console.log(error);
            } else {
              console.log(successData);
              if (this.props.role === 2 && successData.Items.length > 0) {
                this.props.addRole(successData.Items[0].role.S); // can't use ! here, 0 is falsey, add to initial state to redux store
                console.log('adding role');
              }
            }
          };
          getUser(callback, name);
        }).catch(() => {
          console.log('caught');
        });
    }
  }

  renderAuth = () => {
    console.log('renderauth');
    if (this.state.askedForSignIn) {
      return <AuthStateApp signin />;
    } else if (this.state.askedForSignUp) {
      return <AuthStateApp signin={false} />;
    } else {
      return (
        <div style={{ display: 'flex', 'justify-content': 'center' }}>
          <button type="button" onClick={() => this.setState({ askedForSignUp: true })} id="signup-signin-button">Sign In or Create Account</button>
        </div>
      );
    }
  }

  render() {
    // this.checkAuth();
    console.log(this.props.role);
    return (
      <>
        <div className="welcome-body" style={welcomePageStyles[this.state.faded]}>
          <h1>Distributed data, democratized.</h1>
          <p>
            <i>
              One single platform connects you to data from dozens of public applications through a secure, federated architecture.
              <br />
              Build, iterate, and access the exact datasets you need to generate insights.
            </i>
          </p>
        </div>
        {this.props.role === 2 && this.renderAuth()}
        <div style={{ 'margin-top': '100px' }}><HomepageAnimation /></div>
        <ErrorModal open={this.props.open} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
    open: state.modalReducer.open,
  };
};

export default connect(mapStateToProps, { addRole })(Welcome);
