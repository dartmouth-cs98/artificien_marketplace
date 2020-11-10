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
        <br />
        <br />
        <h1>Data Library</h1>
        <br />
        <a href="https://jupyter.artificien.com/hub/login">click here</a>
      </div>
    );
  }
}

export default CreateModel;
