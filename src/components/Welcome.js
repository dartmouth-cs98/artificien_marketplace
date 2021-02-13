/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { connect } from 'react-redux';
import {
  getUser,
} from '../database/databaseCalls';
import { addRole } from '../actions';
import LoadingScreen from '../UtilityComponents/LoadingScreen';
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
    };
  }

  componentDidMount() {
    // if logged in...
    Auth.currentSession()
      .then((data) => {
        const name = data.accessToken.payload.username;
        console.log(name);
        const callback = (successData, error) => { // requires current user to be in database
          if (error) {
            console.log(error);
          } else {
            if (this.props.role === undefined) this.props.addRole(successData.Items[0].role.N); // can't use ! here, 0 is falsey, add to initial state to redux store
          }
        };
        getUser(callback, name);
      });
    // else not logged in...
    // add role to be 2 - "not logged in"
  }

  renderAuth = () => {
    if (this.state.askedForSignIn) { return (<AuthStateApp signin />); } else if (this.state.askedForSignUp) { return (<AuthStateApp signin={false} />); } else {
      return (
        <><button type="button" onClick={() => this.setState({ askedForSignIn: true, faded: 1 })} id="signup-signin-button">Sign In</button>
          <button type="button" onClick={() => this.setState({ askedForSignUp: true, faded: 1 })} id="signup-signin-button">Create Account</button>
        </>
      );
    }
  }

  render() {
    // if current user signed in, change faded to 1
    // check if signed in
    // if so, get has_onboarded.
    //  if has_onboarded == 0:
    //    return slideshow component
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
        {this.renderAuth()}
        {<LoadingScreen />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

export default connect(mapStateToProps, { addRole })(Welcome); // alright we're gonna run our "map state to props" guy to manipulate the state of the following component
// export default connect(mapStateToProps, { addRole })(Welcome); // alright we're gonna run our "map state to props" guy to manipulate the state of the following component
