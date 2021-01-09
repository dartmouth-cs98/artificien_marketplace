import React, { Component } from 'react';
import '../style.scss';
import * as ReactBootstrap from 'react-bootstrap';

/*
Simple component that displays specifics of model selected from user model dashboard
*/
class ModelDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    return (
      // onclick, function will initiate recall of model from PyGrid node
      <div>
        <ReactBootstrap.Card key={Math.random()} style={{ width: '22rem' }}>
          <ReactBootstrap.Card.Header as="h3">{this.props.model_id} on {this.props.dataset}</ReactBootstrap.Card.Header>
          <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title>Submitted on {this.props.date_submitted}</ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text>Model {this.props.percent_complete}% complete</ReactBootstrap.Card.Text>
            <button type="button" className="openbtn2" tabIndex={0} onClick={() => this.props.onClick(this.props.model_id)}>View Model &rarr;</button>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      </div>
    );
  }
}

export default ModelDetailsCard;
