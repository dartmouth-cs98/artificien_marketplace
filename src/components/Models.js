import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';
import { queryModels } from '../databaseCalls';
import ModelDetailsCard from './ModelDetailsCard';
import ModelSideNav from './ModelSideNav';

class Models extends Component {
  constructor(props) {
    super(props);

    this.state = {
      models: null,
      current_user: 'QUILL',
      style: {
        width: 0,
      },
      clickedModel: null,
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidMount() {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ models: data });
      }
    };
    queryModels(callback, this.state.current_user);
    document.addEventListener('click', this.closeNav);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeNav);
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

    // for array
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

    // for array
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

  render() {
    let clickedModel = null;
    if (this.state.clickedModel) {
      console.log('finding clicked content');
      console.log(this.state.models.Items.length);
      for (let i = 0; i < this.state.models.Items.length; i += 1) {
        console.log(this.state.models.Items[i]);
        if (this.state.models.Items[i].model_id.S === this.state.clickedModel) {
          console.log('found it');
          clickedModel = this.state.models.Items[i];
        }
      }
    }
    return (
      <div className="body">
        <div>
          <h1 align="center">My Models</h1>
          <Link to="/create_model" style={{ textDecoration: 'none' }}>
            <button type="button" className="block">
              Upload New Model <span>&#43;</span>
            </button>
          </Link>
          <div>{this.renderModelsInProgress()}</div>
          <div>{this.renderModelsCompleted()}</div>
        </div>
        <div>
          <ModelSideNav content={clickedModel} onClick={this.closeNav} style={this.state.style} />
        </div>
      </div>
    );
  }
}

export default Models;
