import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';

/*
Right-side slide-out component that displays more in-depth information about dataset.
Rendered when user clicks on dataLibraryCard component
*/

class DatasetSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderDatasetCard = () => {
    if (this.props.content.predictable_attributes) {
      // if we have predictable attributes for the card...
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
      // if we don't have predictable attributes for the card...
      return (
        <div className="overlay" style={this.props.style}>
          <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
          <div className="sidenav-container">
            <div className="text-center">
              <h2>{this.props.content.dataset_id.S}</h2>
              <p>Pulled From: {this.props.content.app.S}</p>
              <p>Category: {this.props.content.category.S}</p>
              <p>Predictable Attributes: <i>None</i></p>
            </div>
            <div className="list-group" />
          </div>
        </div>
      );
    }
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    if (!this.props.content) {
      // placeholder div for initial hidden sidebar
      return (
        <div className="overlay" style={this.props.style}>
          <h3>Oops!</h3>
        </div>
      );
    } else {
      return (
        <div>{this.renderDatasetCard()}</div>
      );
    }
  }
}

export default DatasetSideNav;
