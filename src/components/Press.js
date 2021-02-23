import React, { Component } from 'react';
import '../style.scss';
import BottomNav from './BottomNav';

/*
Simple component that links to user-specific jupyterhub instance
*/

class AboutUs extends Component {
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
          <h1>Press</h1>
          <p>No press...yet ;)</p>
          <div className="footer"> <BottomNav /> </div>
        </div>
      </>
    );
  }
}

export default AboutUs;
