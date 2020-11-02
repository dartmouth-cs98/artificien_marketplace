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
    return (
      <div>
        <ReactBootstrap.Card key={Math.random()} style={{ width: '22rem' }}>
          <ReactBootstrap.Card.Header as="h3">{this.props.model_id}</ReactBootstrap.Card.Header>
          <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title>Submitted on {this.props.date_submitted}</ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text>Model {this.props.percent_complete}% complete</ReactBootstrap.Card.Text>
            <button type="button" className="openbtn" tabIndex={0} onClick={this.props.onClick}>Learn More</button>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      </div>
    );
  }
}

export default ModelDetailsCard;
