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
    return (
      <div className="overlay" style={this.props.style}>
        <div className="sidenav-container">
          <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
          <div className="text-center">
            <h2>Model X</h2>
            <p>Model details go here</p>
          </div>
          <div className="list-group" />
        </div>
      </div>
    );
  }
}

export default ModelSideNav;
