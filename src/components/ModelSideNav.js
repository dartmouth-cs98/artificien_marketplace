import React, { Component } from 'react';
import '../style.scss';

/*
Right-side slide-out component that displays more in-depth information about model.
Rendered when user clicks on modelDetailsCard component
*/
class ModelSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    if (!this.props.content) {
      // placeholder for concealed slideout menu
      return (
        <div className="overlay" style={this.props.style}>
          <h3>Oops!</h3>
        </div>
      );
    }
    // If we've got the url to go to a completed model, show button to download it
    if (this.props.retrievedURL) {
      return (
        <div className="overlay" style={this.props.style}>
          <div className="sidenav-container">
            <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
            <div className="text-center">
              <h2>{this.props.content.model_id.S}</h2>
              <p>Model started: {this.props.content.date_submitted.S}</p>
              <p>Training on: {this.props.content.dataset.S}</p>
              <p>Percent Complete: {this.props.content.percent_complete.N}%</p>
            </div>
            <a href={this.props.retrievedURL} className="rtrvbtn" rel="noreferrer" target="_blank">Download Model</a>
            <div className="list-group" />
          </div>
        </div>
      );
    } else { // if not, show model to retrieve model
      return (
        <div className="overlay" style={this.props.style}>
          <div className="sidenav-container">
            <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
            <div className="text-center">
              <h2>{this.props.content.model_id.S}</h2>
              <p>Model started: {this.props.content.date_submitted.S}</p>
              <p>Training on: {this.props.content.dataset.S}</p>
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
