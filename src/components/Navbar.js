import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../style.scss';

/*
Simple top navigation bar
*/

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    return (
      <>
        <div className="logo" active />
        <nav>
          <ul className="nav-ul">
            <li>
              <NavLink to="/" exact> Home </NavLink>
            </li>
            <li>
              <NavLink to="/data_library"> Data Library </NavLink>
            </li>
            <li>
              <NavLink to="/models"> Models </NavLink>
            </li>
            <li>
              <NavLink to="/select_data"> Data Upload </NavLink>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default withRouter(Navbar);
