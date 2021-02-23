import React, { Component } from 'react';
import '../style.scss';
import BottomNav from './BottomNav';

/*
Simple component that links to user-specific jupyterhub instance
*/

class Careers extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    return (
      <>
        <div className="body">
          <h1>Careers</h1>
          <p>No jobs...yet ;)</p>
          <div className="footer"> <BottomNav /> </div>
        </div>
      </>
    );
  }
}

export default Careers;
