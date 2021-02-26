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

  // W3 i used: https://www.w3schools.com/howto/howto_css_social_media_buttons.asp; but the way we do it causes an error!
  render() {
    return (
      <div className="bottom-nav-container">
        <div id="bottom-nav-column">Company
          <p><NavLink ClassName="active" to="/about_us"> About Us </NavLink></p>
          <p><NavLink to="/careers"> Careers </NavLink></p>
          <p><NavLink to="/press"> Press </NavLink></p>
        </div>
        <div id="bottom-nav-column">Products
          <p><NavLink ClassName="active" to="/marketplace"> Marketplace </NavLink></p>
          <p><NavLink to="/models"> My Models </NavLink></p>
          <p><NavLink to="/upload_data"> Data Upload </NavLink></p>
          <p><NavLink to="/how_it_works"> How It Works </NavLink></p>
        </div>
        <div id="bottom-nav-column">Help
          <p><NavLink to="/documentation"> Documentation </NavLink></p>
          <p><a href="https://artificien.zendesk.com/hc/en-us">Support Desk</a></p>
        </div>
        <div id="bottom-nav-column">Contact
          <p />
          <p> <a href="https://www.linkedin.com/in/tobias-lange/" className="fa fa-linkedin">li</a> <br /></p>
          <p> <a href="https://www.facebook.com/tobias.lange.5494/" className="fa fa-facebook">f</a></p>
        </div>
      </div>
    );
  }
}

export default BottomNav;
