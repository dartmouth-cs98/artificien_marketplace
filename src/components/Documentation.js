/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
import DocumentationDrawer from './DocumentationDrawer';
// import PersistentDrawerLeft from './PersistentDrawerLeft';

class Documentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return (
      <div className="body">
        <DocumentationDrawer />
      </div>
    );
  }
}

export default Documentation;
