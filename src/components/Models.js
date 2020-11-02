import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import { queryModels } from '../databaseCalls';
import ModelDetailsCard from './ModelDetailsCard';

class Models extends Component {
  constructor(props) {
    super(props);

    this.state = {
      models: null,
      current_user: 'QUILL',
    };
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
  }

  // Render each organization's details as a card
  renderModelsInProgress = () => {
    if (!this.state.models) { return 'No in progress models found'; }

    // for array
    const renderedModels = this.state.models.Items.map((model) => {
      if (model.active_status.N === '1') {
        return (
          <ModelDetailsCard key={Math.random()} model_id={model.model_id.S} date_submitted={model.date_submitted.S} in_progress="true" />
        );
      }
      return null;
    });

    const renderedModelTable = (
      <div>
        <h1 align="center">In Progress</h1>
        {renderedModels}
      </div>
    );
    return renderedModelTable;
  }

  renderModelsCompleted = () => {
    if (!this.state.models) { return 'No finished models found'; }

    // for array
    const renderedModels = this.state.models.Items.map((model) => {
      if (model.active_status.N === '0') {
        return (
          <ModelDetailsCard key={Math.random()} model_id={model.model_id.S} date_submitted={model.date_submitted.S} in_progress="false" />
        );
      }
      return null;
    });

    const renderedModelTable = (
      <div>
        <h1 align="center">Completed</h1>
        {renderedModels}
      </div>
    );
    return renderedModelTable;
  }

  render() {
    return (
      <div>
        <div>
          <br />
          <br />
          <h1>Models Page</h1>
          <div>{this.renderModelsInProgress()}</div>
          <div>{this.renderModelsCompleted()}</div>
        </div>
        <span role="button" className="openbtn" tabIndex={0} style={{ fontSize: 30 }} onClick={this.openNav}> open</span>
        <div className="overlay" style={this.state.style}>
          <div className="sidenav-container">
            <button type="button" className="closebtn" onClick={this.closeNav}>x</button>
            <div className="text-center">
              <h2>Form</h2>
              <p>This is a sample input form</p>
            </div>
            <div className="list-group">
              {/* your form component goes here */}
              {this.props.children}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Models;
