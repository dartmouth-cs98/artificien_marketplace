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
      <div>
        <iframe title="jupyterembedded">https://jupyter.artificien.com/hub/login</iframe>
      </div>
    );
  }
}

export default CreateModel;
