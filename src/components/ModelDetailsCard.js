import React, { Component } from 'react';
import '../style.scss';

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
        <div className="data-card" key={Math.random()} style={{ width: '22rem' }}>
          <h3>{this.props.model_id} on {this.props.dataset}</h3>
          <div className="card-body">
            <h3>Submitted on {this.props.date_submitted}</h3>
            <p>Model {this.props.percent_complete}% complete</p>
            <button type="button" className="data-card-button" tabIndex={0} onClick={() => this.props.onClick(this.props.model_id)}>View Model &rarr;</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModelDetailsCard;
