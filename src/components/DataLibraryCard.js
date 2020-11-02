import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import * as ReactBootstrap from 'react-bootstrap';// import { Button } from 'reactstrap';
// import { queryModels } from '../databaseCalls';

class DataLibraryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ReactBootstrap.Card key={Math.random()} className="cardholder" style={{ width: '22rem' }}>
        <ReactBootstrap.Card.Body>
          <ReactBootstrap.Card.Title as="h1">{this.props.app}</ReactBootstrap.Card.Title>
          <ReactBootstrap.Card.Text>{this.props.num_devices} Users</ReactBootstrap.Card.Text>
          <ReactBootstrap.Card.Text>Category: {this.props.category}</ReactBootstrap.Card.Text>
          <ReactBootstrap.Button>Learn More</ReactBootstrap.Button>
        </ReactBootstrap.Card.Body>
      </ReactBootstrap.Card>
    );
  }
}

export default DataLibraryCard;
