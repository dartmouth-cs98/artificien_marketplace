import React, { Component } from 'react';
import '../style.scss';
import * as ReactBootstrap from 'react-bootstrap';

/*
Simple component that displays card-level details for each dataset available
*/
class DataLibraryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    return (
      <div>
        <ReactBootstrap.Card key={Math.random()} style={{ width: '22rem' }}>
          <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title as="h1">{this.props.app}</ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text>{this.props.num_devices} Users</ReactBootstrap.Card.Text>
            <ReactBootstrap.Card.Text>Category: {this.props.category}</ReactBootstrap.Card.Text>
            <button type="button" className="openbtn" tabIndex={0} onClick={() => this.props.onClick(this.props.dataset_id)}>Learn More</button>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      </div>
    );
  }
}

export default DataLibraryCard;
