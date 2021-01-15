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
  render() {
    Auth.currentSession()
      .then((data) => {
        console.log(data);
        const name = data.accessToken.payload.username;
        const callback = (successData, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(successData.Item.role.N); // display all datasets in db as catalog
            this.props.addRole(successData.Item.role.N); // "add to redux store"
            // put in redux store
          }
        };
        getUser(callback, name);
      });
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
        </div>
        <div className="landing" />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.role,
  };
};

export default connect(mapStateToProps, { addRole })(Welcome); // alright we're gonna run our "map state to props" guy to manipulate the state of the following component
