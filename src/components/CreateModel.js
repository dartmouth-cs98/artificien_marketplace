import React, { Component } from 'react';
// import { Input, Button } from 'reactstrap';
import '../style.scss';

class CreateModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="body">
        <h1>Model Upload</h1>
        <a href="https://jupyter.artificien.com/hub/login" title="embedded jupyter" target="_blank" rel="noreferrer">Click here to upload your model</a>
      </div>
    );
  }
}

export default CreateModel;
