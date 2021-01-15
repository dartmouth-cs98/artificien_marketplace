import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';
import { Auth } from 'aws-amplify';
import { queryModels } from '../database/databaseCalls';
import ModelDetailsCard from './ModelDetailsCard';
import ModelSideNav from './ModelSideNav';

/*
Component that displays all user models, both active and inactive (in different sections)
When each model is clicked on, a menu will slide out from the right hand slide, giving more information about the model...
and allowing the user to recall the model if it is completed.

Uses the subcomponents:
  - ModelDetailsCard
  - ModelSideNav
  - CreateModel
*/
class Models extends Component {
  constructor(props) {
    super(props);

    this.state = {
      models: null,
      currentUser: null,
      userNotSet: true,
      style: {
        width: 0,
      },
      clickedModel: null,
      retrievedModelURL: null,
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  // mounting methods for slideout menu
  componentDidMount() {
    document.addEventListener('click', this.closeNav);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeNav);
  }

  // figure out which user is currently logged in and query their models
  getCurrentUser = () => {
    if (this.state.userNotSet) {
      Auth.currentSession()
        .then((data) => {
          console.log(data);
          console.log(data.accessToken.payload.username);
          this.setState({ currentUser: data.accessToken.payload.username });
          this.setState({ userNotSet: false });
          this.queryUserModels();
        });
    }
  }

  // even if user revisiting page, must re-query their models
  queryUserModels = () => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ models: data });
      }
    };
    queryModels(callback, this.state.currentUser.toLowerCase());
  }

  // actually get model with simple API call to aws endpoint. All necessary parameters included
  retrieveModel = (clickedModel) => {
    const path = 'retrieve';
    const ownerName = '?ownerName='.concat('', clickedModel.owner_name.S);
    const modelId = '&modelId='.concat('', clickedModel.model_id.S);
    const version = '&version='.concat('', clickedModel.version.S);
    const url = '&nodeURL='.concat('', clickedModel.node_URL.S);
    const queryParams = path + ownerName + modelId + version + url;

    const endpoint = 'https://mxxq8l6m48.execute-api.us-east-1.amazonaws.com/prod/';
    const queryString = endpoint + queryParams;

    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.bucket_url);
        this.setState({ retrievedModelURL: data.bucket_url });
      });
  }

  // open and close sidebar
  openNav(modelId) {
    this.setState({ style: { width: 350 } });
    console.log(modelId);
    this.setState({ clickedModel: modelId });
  }

  closeNav() {
    document.removeEventListener('click', this.closeNav);
    const style = { width: 0 };
    this.setState({ style });
  }

  // get only the models in progress
  renderModelsInProgress = () => {
    if (!this.state.models) { return 'You have no Models in progress. Go to Create Model to make one'; }
    if (!this.state.models.Items) { return null; }

    // if the user has models, map each to a card
    const renderedModels = this.state.models.Items.map((model) => {
      if (model.active_status.N === '1') {
        console.log(model);
        return (
          <ModelDetailsCard onClick={this.openNav}
            key={Math.random()}
            model_id={model.model_id.S}
            dataset={model.dataset.S}
            date_submitted={model.date_submitted.S}
            percent_complete={model.percent_complete.N}
          />
        );
      }
      return null;
    });

    // put em all together in one container
    const renderedModelTable = (
      <div>
        <h2 align="left">In Progress</h2>
        <div className="card-holder">
          {renderedModels}
        </div>
      </div>
    );
    return renderedModelTable;
  }

  // get only the models completed
  renderModelsCompleted = () => {
    if (!this.state.models) { return 'You have no completeds models'; }
    if (this.state.userNotSet) { return null; }

    if (!this.state.models.Items) {
      return (
        <h3>You have no completed models</h3>
      );
    }

    const renderedModels = this.state.models.Items.map((model) => {
      if (model.active_status.N === '0') {
        return (
          <ModelDetailsCard onClick={this.openNav} // onclick opens sidebar
            key={Math.random()}
            model_id={model.model_id.S}
            dataset={model.dataset.S}
            date_submitted={model.date_submitted.S}
            percent_complete={model.percent_complete.N}
          />
        );
      }
      return null;
    });

    const renderedModelTable = (
      <div>
        <h2 align="left">Completed</h2>
        <div className="card-holder">
          {renderedModels}
        </div>
      </div>
    );
    return renderedModelTable;
  }

  // button to take to CreateModel component
  renderCreateModelButton = () => {
    return (
      <div>
        <h1 align="center">My Models</h1>
        <Link to="/create_model" style={{ textDecoration: 'none' }}>
          <button type="button" className="block">
            Upload New Model <span>&#43;</span>
          </button>
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    let clickedModel = null;
    if (this.state.clickedModel) {
      // if we've clicked on a model, iterate through queried model to find which one
      for (let i = 0; i < this.state.models.Items.length; i += 1) {
        if (this.state.models.Items[i].model_id.S === this.state.clickedModel) {
          clickedModel = this.state.models.Items[i]; // this model will be whose details are displayed in sliding sidebar
        }
      }
    }
    this.getCurrentUser();
    return (
      <div className="body">
        <div>
          <div>{this.renderCreateModelButton()}</div>
          <div>{this.renderModelsInProgress()}</div>
          <div>{this.renderModelsCompleted()}</div>
        </div>
        <div>
          <ModelSideNav content={clickedModel}
            retrievedURL={this.state.retrievedModelURL}
            retrieveFunction={() => this.retrieveModel(clickedModel)}
            onClick={() => this.closeNav()}
            style={this.state.style}
          />
        </div>
      </div>
    );
  }
}

export default Models;
