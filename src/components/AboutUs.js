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
          <h1>Vision</h1>
          <p>to be filled in.</p>
          <h1>Team</h1>
          <img src="MK_headshot.jpg" alt="matt" />
          <p>text about mr. matt</p>
          <img alt="matt" src="img/JE_headshot.jpg" />
          <p>text about mr. jake</p>
          <img alt="matt" src="img/AQ_Headshot.jpg" />
          <p>text about mr. quill</p>
          <img alt="matt" src="img/TL_headshot.jpg" />
          <p>text about mr. bobe</p>
          <img alt="matt" src="img/SA_headshot.jpg" />
          <p>text about mr. shrey</p>
          <div className="footer"> <BottomNav /> </div>
        </div>
      </>
    );
  }
}

export default AboutUs;
