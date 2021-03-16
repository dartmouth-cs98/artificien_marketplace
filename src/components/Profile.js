/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import LoadingScreen from '../UtilityComponents/LoadingScreen';
import { getUser, queryModels, queryDatasetsOwner } from '../database/databaseCalls';
import '../style.scss';
import ChangeUsernameForm from './ChangeUsernameForm';
import UserMetricsCard from './UserMetricsCard';
import ProfileAccordion from './ProfileAccordion';
import ErrorModal from '../UtilityComponents/ErrorModal';

/*
Component that provides the user their information, will allow editing capabilities in the future.
*/

class Profile extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
      accessID: null,
      userData: null,
      usernameChange: false,
      clientMetricsDict: {
        userModels: null,
        numDevicesReached: 0,
        averageTrainingTime: [0, 0],
      },
      devMetricsDict: {
        userDatasets: null,
      },
    };
  }

  // mounting
  componentDidMount() {
    Auth.currentSession()
      .then((data) => {
        console.log(data);
        const name = data.accessToken.payload.username;
        console.log(name);
        // for apiKey
        const clientID = data.accessToken.jwtToken;
        this.setState({ accessID: clientID });
        this.queryUser(name);
        // check if user has any models, preps metrics cards
        const modelsQueryCallback = (success, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
            const newclientMetricsDict = { ...this.state.clientMetricsDict, userModels: success }; // get the user's models that allow for deeper summary
            this.setState({ clientMetricsDict: newclientMetricsDict });
          }
        };
        queryModels(modelsQueryCallback, name);
        // check if user owns any datasets/apps, preps metrics cards
        const datasetsQueryCallback = (success, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
            const newDevMetricsDict = { ...this.state.devMetricsDict, userDatasets: success }; // get the user's datasets
            this.setState({ devMetricsDict: newDevMetricsDict });
          }
        };
        queryDatasetsOwner(datasetsQueryCallback, name);
      });
    // get metrics here
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
        console.log('user data:');
        console.log(data.Items[0]);
        this.setState({ userData: data.Items[0] });
      }
    };
    getUser(callback, name);
  }

  renderClientMetricsCards = () => { // loops over client clientMetricsDict
    const metricCards = [];
    if (!this.state.clientMetricsDict.userModels) return null;

    for (let i = 0; i < Object.keys(this.state.clientMetricsDict).length; i += 1) {
      if (String(Object.keys(this.state.clientMetricsDict)[i]) === 'userModels') {
        metricCards.push(<UserMetricsCard id="user-metric" title="Number of Models Created" body={this.state.clientMetricsDict.userModels.Items.length} username={this.state.userData.username.S} />);
      }
    }
    return metricCards;
  }

  renderDevMetricsCards = () => {
    const metricCards = [];
    console.log(this.state.devMetricsDict);
    if (!this.state.devMetricsDict.userDatasets) {
      metricCards.push(<UserMetricsCard id="user-metric" title="Number of Datasets Submitted" body={0} username={this.state.userData.username.S} />);
    } else {
      let integrated = 0;
      for (let i = 0; i < this.state.devMetricsDict.userDatasets.Items.length; i += 1) {
        if (this.state.devMetricsDict.userDatasets.Items[i].properlySetUp && this.state.devMetricsDict.userDatasets.Items[i].properlySetUp.BOOL) integrated += 1;
      }
      metricCards.push(<UserMetricsCard id="user-metric" title="Number of Datasets Submitted" body={this.state.devMetricsDict.userDatasets.Items.length} username={this.state.userData.username.S} />);
      metricCards.push(<UserMetricsCard id="user-metric" title="Number of Datasets Integrated" body={integrated} username={this.state.userData.username.S} />);
    }
    return metricCards;
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    console.log(this.props.role);
    if (this.state.userData && this.state.clientMetricsDict.userModels) {
      return (
        <>
          <h1 align="center">My Profile</h1>
          <div className="profile-page-user-metrics-body">
            {Number.parseInt(this.props.role, 10) === 0 && <div className="user-metric-container">{this.renderClientMetricsCards()}</div>}
            {Number.parseInt(this.props.role, 10) === 1 && <div className="user-metric-container">{this.renderDevMetricsCards()}</div>}
          </div>
          <ProfileAccordion content={this.state.userData} id={this.state.accessID} appsManaged={this.state.devMetricsDict.userDatasets} />
          <ErrorModal open={this.props.error} />
        </>
      );
    } else {
      return (
        <LoadingScreen />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
    open: state.appReducer.open,
    error: state.modalReducer.open,
  };
};

export default connect(mapStateToProps)(Profile);
