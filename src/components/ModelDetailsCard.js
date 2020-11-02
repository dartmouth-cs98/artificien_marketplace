import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import * as ReactBootstrap from 'react-bootstrap';// import { Button } from 'reactstrap';
// import { queryModels } from '../databaseCalls';

class ModelDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.in_progress === 'true') {
      return (
        <div>
          <ReactBootstrap.Card>
            <ReactBootstrap.Card.Header as="h3">{this.props.model_id}</ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title>Submitted on {this.props.date_submitted}</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>Model {String(Math.floor(Math.random() * 100)).concat('%')} complete</ReactBootstrap.Card.Text>
              <ReactBootstrap.Button variant="primary">View Model</ReactBootstrap.Button>
            </ReactBootstrap.Card.Body>
          </ReactBootstrap.Card>
        </div>
      );
    } else {
      return (
        <div>
          <ReactBootstrap.Card>
            <ReactBootstrap.Card.Header as="h3">{this.props.model_id}</ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title>Submitted on {this.props.date_submitted}</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>Model 100% complete</ReactBootstrap.Card.Text>
              <ReactBootstrap.Button variant="primary">View Model</ReactBootstrap.Button>
            </ReactBootstrap.Card.Body>
          </ReactBootstrap.Card>
        </div>
      );
    }
  }
}

export default ModelDetailsCard;
