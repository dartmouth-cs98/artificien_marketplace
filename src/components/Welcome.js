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

// welcome variable on homepage

class Welcome extends Component {
  componentDidMount() {
    Auth.currentSession()
      .then((data) => {
        // console.log(data);
        const name = data.accessToken.payload.username;
        const callback = (successData, error) => {
          if (error) {
            console.log(error);
          } else {
            if (this.props.role === undefined) this.props.addRole(successData.Item.role.N); // can't use ! here, 0 is falsey, add to initial state to redux store
          }
        };
        getUser(callback, name);
      });
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
          {Math.random() > 0.5 && <p>This is where the login button should go</p>}
        </div>
        <div className="landing" />
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
