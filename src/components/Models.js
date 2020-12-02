import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';
import { Auth } from 'aws-amplify';
import { queryModels } from '../databaseCalls';
import ModelDetailsCard from './ModelDetailsCard';
import ModelSideNav from './ModelSideNav';

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

  componentDidMount() {
    // const callback = (data, error) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(data);
    //     this.setState({ models: data });
    //   }
    // };
    // queryModels(callback, this.state.currentUser);
    document.addEventListener('click', this.closeNav);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeNav);
  }

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

  queryUserModels = () => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ models: data });
      }
    };
    queryModels(callback, this.state.currentUser);
  }

  retrieveModel = (clickedModel) => {
    const path = 'retrieve';
    const ownerName = '?ownerName='.concat('', clickedModel.owner_name.S);
    const modelId = '&modelId='.concat('', clickedModel.model_id.S);
    const version = '&version='.concat('', clickedModel.version.S);
    const url = '&nodeURL='.concat('', clickedModel.node_URL.S);

    const queryParamArray = [path, ownerName, modelId, version, url];
    const queryParams = queryParamArray.join('');

    const endpoint = 'https://mxxq8l6m48.execute-api.us-east-1.amazonaws.com/prod/';
    const paramArray = [endpoint, queryParams];
    const queryString = paramArray.join('');
    console.log(queryString);

    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.bucket_url);
        this.setState({ retrievedModelURL: data.bucket_url });
      });
  }

  openNav(modelId) {
    this.setState({ style: { width: 350 } });
    console.log(modelId);
    this.setState({ clickedModel: modelId });
  }

  closeNav() {
    document.removeEventListener('click', this.closeNav);
    console.log('bongo');
    const style = { width: 0 };
    this.setState({ style });
  }

  renderModelsInProgress = () => {
    if (!this.state.models) { return 'You have no Models in progress. Go to Create Model to make one'; }
    if (!this.state.models.Items) { return null; }

    const renderedModels = this.state.models.Items.map((model) => {
      if (model.active_status.N === '1') {
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

  render() {
    let clickedModel = null;
    if (this.state.clickedModel) {
      for (let i = 0; i < this.state.models.Items.length; i += 1) {
        if (this.state.models.Items[i].model_id.S === this.state.clickedModel) {
          console.log('found it');
          clickedModel = this.state.models.Items[i];
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
