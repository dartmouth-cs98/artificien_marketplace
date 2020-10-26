import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../style.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <>
        <div className="logo" active />
        <nav>
          <ul>
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
              <NavLink to="/select_data"> Select Data </NavLink>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default withRouter(Navbar);
