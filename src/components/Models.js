import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
// import { Button } from 'reactstrap';
import * as ReactBootstrap from 'react-bootstrap';// import { Button } from 'reactstrap';
import { queryModels } from '../databaseCalls';

class Models extends Component {
  constructor(props) {
    super(props);

    this.state = {
      models: null,
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
    queryModels(callback, 'QUILL');
  }

  // Render each organization's details as a card
  renderModelsInProgress = () => {
    if (!this.state.models) { return 'No in progress models found'; }

    // for array
    const renderedModels = this.state.models.Items.map((model) => {
      if (model.active_status.N === '1') {
        return (
          <ReactBootstrap.Card className="cardholder" style={{ width: '22rem' }}>
            <ReactBootstrap.Card.Header as="h1">{model.model_id.S}</ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title>Submission Date: {model.date_submitted.S}</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>
                Complete: {String(Math.floor(Math.random() * 100)).concat('%')}
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Button variant="primary">View Model</ReactBootstrap.Button>
            </ReactBootstrap.Card.Body>
          </ReactBootstrap.Card>
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
          <ReactBootstrap.Card className="cardholder" style={{ width: '22rem' }}>
            <ReactBootstrap.Card.Header as="h1">{model.model_id.S}</ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title>Submitted on {model.date_submitted.S}</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>
                Model 100% complete
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Button variant="primary">View Model</ReactBootstrap.Button>
            </ReactBootstrap.Card.Body>
          </ReactBootstrap.Card>
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
      </div>

    );
  }
}

export default Models;
