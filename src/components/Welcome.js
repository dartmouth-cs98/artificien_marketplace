/* eslint-disable no-lonely-if */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import {
  getUser,
} from '../database/databaseCalls';
import { addRole } from '../actions';
import LoadingScreen from '../UtilityComponents/LoadingScreen';

// welcome variable on homepage

class Welcome extends Component {
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

  render() {
    return (
      <>
        <div className="body">
          <h1>Distributed data, democratized.</h1>
          <p>
            <i>
              One single platform connects you to data from dozens of public applications through a secure, federated architecture.
              <br />
              Build, iterate, and access the exact datasets you need to generate insights.
            </i>
          </p>
          {/* if not logged in */}
          {Math.random() > 0.5 && <p>This is where the login button should go</p>}
        </div>
        <div className="landing">
          <LoadingScreen />
        </div>
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
