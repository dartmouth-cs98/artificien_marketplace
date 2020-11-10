import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';

class DatasetSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderDatasetCard = () => {
    if (this.props.content.predictable_attributes) {
      return (
        <div className="overlay" style={this.props.style}>
          <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
          <div className="sidenav-container">
            <div className="text-center">
              <h2>{this.props.content.dataset_id.S}</h2>
              <p>Pulled From: {this.props.content.app.S}</p>
              <p>Category: {this.props.content.category.S}</p>
              <p>Predictable Attributes: {this.props.content.predictable_attributes.S}</p>
            </div>
            <div className="list-group" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="overlay" style={this.props.style}>
          <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
          <div className="sidenav-container">
            <div className="text-center">
              <h2>{this.props.content.dataset_id.S}</h2>
              <p>Pulled From: {this.props.content.app.S}</p>
              <p># of Devices: {this.props.content.num_devices.N}</p>
              <p>Category: {this.props.content.category.S}</p>
              <p>Predictable Attributes: {this.props.content.predictable_attributes.S}</p>
            </div>
            <div className="list-group" />
          </div>
        </div>
      );
    }
  }
}

export default DatasetSideNav;
