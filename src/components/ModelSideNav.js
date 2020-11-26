import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';

class ModelSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (!this.props.content) {
      return (
        <div className="overlay" style={this.props.style}>
          <div className="sidenav-container">
            <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
            <div className="text-center">
              <h2>Blar</h2>
              <p>Model details go here</p>
            </div>
            <div className="list-group" />
          </div>
        </div>
      );
    }
    if (this.props.retrievedURL) {
      return (
        <div className="overlay" style={this.props.style}>
          <div className="sidenav-container">
            <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
            <div className="text-center">
              <h2>{this.props.content.model_id.S}</h2>
              <p>Model started: {this.props.content.date_submitted.S}</p>
              <p>Training on: {this.props.content.dataset.S}</p>
              <p>Predicting: {this.props.content.attribute_predicted.S}</p>
              <p>Percent Complete: {this.props.content.percent_complete.N}%</p>
            </div>
            <p><strong>Download at: {this.props.retrievedURL}</strong></p>
            <div className="list-group" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="overlay" style={this.props.style}>
          <div className="sidenav-container">
            <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
            <div className="text-center">
              <h2>{this.props.content.model_id.S}</h2>
              <p>Model started: {this.props.content.date_submitted.S}</p>
              <p>Training on: {this.props.content.dataset.S}</p>
              <p>Predicting: {this.props.content.attribute_predicted.S}</p>
              <p>Percent Complete: {this.props.content.percent_complete.N}%</p>
            </div>
            <button type="button" className="dwnldbtn" onClick={this.props.retrieveFunction}>Retrieve Model &darr;</button>
            <div className="list-group" />
          </div>
        </div>
      );
    }
  }
}

export default ModelSideNav;
