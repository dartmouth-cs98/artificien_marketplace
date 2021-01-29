import React, { Component } from 'react';
import '../style.scss';

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
      <div className="data-card" key={Math.random()} style={{ width: '22rem' }}>
        <div className="card-body">
          <h1>{this.props.app}</h1>
          <p>{this.props.num_devices} Users</p>
          <p>Category: {this.props.category}</p>
          <button type="button" className="data-card-button" tabIndex={0} onClick={() => this.props.onClick(this.props.dataset_id)}>Learn More</button>
        </div>
      </div>
    );
  }
}

export default DataLibraryCard;
