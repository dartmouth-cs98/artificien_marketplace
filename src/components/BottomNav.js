import '../style.scss';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class BottomNav extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="bottom-nav-container">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div id="bottom-nav-column">Company
          <p>About Us</p>
          <p>Leadership</p>
          <p>Careers</p>
          <p>Press</p>
        </div>
        <div id="bottom-nav-column">Products
          <p><NavLink ClassName="active" to="/data_library"> Marketplace </NavLink></p>
          <p><NavLink to="/models"> My Models </NavLink></p>
          <p><NavLink to="/upload_data"> Data Upload </NavLink></p>
        </div>
        <div id="bottom-nav-column">Help
          <p><a href="https://artificien.zendesk.com/hc/en-us">Support Desk</a></p>
          <p><NavLink to="/documentation"> Documentation </NavLink></p>
        </div>
        <div id="bottom-nav-column">Contact
          <p> <a href="https://www.linkedin.com/in/tobias-lange/" className="fa fa-linkedin" /> </p>
          <p> <a href="https://www.facebook.com/tobias.lange.5494/" className="fa fa-facebook" /></p>
          <p> <a href="https://twitter.com/ShreyasAgnihot4" className="fa fa-twitter" /> <br /> </p>
        </div>
      </div>
    );
  }
}

export default BottomNav;
