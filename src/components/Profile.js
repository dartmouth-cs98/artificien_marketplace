/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Card, Nav, Button } from 'react-bootstrap';
import { getUser, queryModels } from '../database/databaseCalls';
import '../style.scss';
import ChangeUsernameForm from './ChangeUsernameForm';
import UserMetricsCard from './UserMetricsCard';

/*
Component that provides the user their information, will allow editing capabilities in the future.
*/

class Profile extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      usernameChange: false,
      metricsDict: {
        userModels: null,
        numDevicesReached: 1000,
        averageTrainingTime: [7, 16],
      },
    };
  }

  // mounting
  componentDidMount() {
    Auth.currentSession()
      .then((data) => {
        console.log(data);
        const name = data.accessToken.payload.username;
        this.queryUser(name);
        const modelsQueryCallback = (success, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
            const newMetricsDict = { ...this.state.metricsDict, userModels: success };
            this.setState({ metricsDict: newMetricsDict });
          }
        };
        queryModels(modelsQueryCallback, name);
      });
    // get metrics here

    // metric 2: Devices reached
    // metric 3: Average training time
  }

  // figure out which user is currently logged in and query their models

  renderChangeButton = () => {
    if (this.state.usernameChange) {
      return <ChangeUsernameForm />;
    }
    return null;
  }

  // even if user revisiting page, must re-query their information
  queryUser = (name) => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        console.log(data.Items[0]);
        this.setState({ userData: data.Items[0] });
      }
    };
    getUser(callback, name);
  }

  renderSecondRow = () => {
    const infoItemList = [];
    if (this.state.userData.enterprise) {
      infoItemList.push(<div id="profile-page-user-info"> <h3 id="profile-page-user-info-item">Enterprise: {this.state.userData.enterprise.S}</h3></div>);
    }
    if (this.state.userData.date_joined) {
      infoItemList.push(<div id="profile-page-user-info"> <h3 id="profile-page-user-info-item">Date Joined: {this.state.userData.date_joined.S}</h3></div>);
    }
    if (this.state.userData.bank_info && this.state.userData.bank_info.bank) {
      infoItemList.push(<div id="profile-page-user-info"> <h3 id="profile-page-user-info-item">Bank Name: {this.state.userData.bank_info.bank}</h3></div>);
    }
    if (this.state.userData.bank_info && this.state.userData.bank_info.bank_number) {
      infoItemList.push(<div id="profile-page-user-info"> <h3 id="profile-page-user-info-item">Bank Number: {this.state.userData.bank_info.bank_number}</h3></div>);
    }
    return (
      <div className="profile-page-user-info-body-row">
        {infoItemList}
      </div>
    );
  }

  renderMetricsCards = () => {
    const metricCards = [];
    console.log(this.state.metricsDict);
    if (!this.state.metricsDict.userModels) return null;

    for (let i = 0; i < Object.keys(this.state.metricsDict).length; i += 1) {
      if (String(Object.keys(this.state.metricsDict)[i]) === 'userModels') {
        console.log('models');
        metricCards.push(<UserMetricsCard id="user-metric" title="Number of Models Created" body={this.state.metricsDict.userModels.Items.length} username={this.state.userData.username.S} />);
      } else if (String(Object.keys(this.state.metricsDict)[i]) === 'numDevicesReached') {
        console.log('numDevices');
        metricCards.push(<UserMetricsCard id="user-metric" title="Number of Devices Reached" body={this.state.metricsDict.numDevicesReached} username={this.state.userData.username.S} />);
      } else if (String(Object.keys(this.state.metricsDict)[i]) === 'averageTrainingTime') {
        console.log('training');
        metricCards.push(<UserMetricsCard id="user-metric" title="Average Training Time" body={this.state.metricsDict.averageTrainingTime} username={this.state.userData.username.S} />);
      } else {
        console.log(Object.keys(this.state.metricsDict)[i]);
      }
    }
    return metricCards;
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  // 2 errors rn: cannot print on new lines, struggling to print out the arrays for bank name and number
  render() {
    if (this.state.userData && this.state.metricsDict.userModels) {
      return (
        <>
          <div className="profile-page-user-info-body-row">
            <div id="profile-page-user-info">
              <div id="change-profile-info">
                <h3 id="profile-page-user-info-item">Username: {this.state.userData.username.S}</h3>
                <button type="button" className="change-user-data-button" onClick={() => this.setState({ usernameChange: true })}>Change</button>
                {this.renderChangeButton()}
              </div>
            </div>
            <div id="profile-page-user-info"> {this.state.userData.user_id && <h3 id="profile-page-user-info-item">User ID: {this.state.userData.user_id.S}</h3>} </div>
            <div id="profile-page-user-info"> {this.state.userData.user_account_email && <h3 id="profile-page-user-info-item">Email: {this.state.userData.user_account_email.S}</h3>} </div>
          </div>
          {this.renderSecondRow()}
          <div className="profile-page-user-metrics-body">
            <div className="user-metric-container">{this.renderMetricsCards()}</div>
          </div>
        </>
      );
    } else {
      return (
        <div>Nothing to see here!</div>
      );
    }
  }
}

export default Profile;
