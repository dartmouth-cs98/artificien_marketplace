import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../style.scss';
import { withAuthenticator } from '@aws-amplify/ui-react';
import RoleButton from './RoleButton';

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
        <nav className="nav">
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
          <ul className="nav-role-button-ul">
            <li className="role-button">
              <RoleButton />
            </li>
            {/* <li>
              {Math.random() > 0.5 && <AmplifySignOut />}
            </li> */}
          </ul>
        </nav>
      </>
    );
  }
}

export default withRouter(withAuthenticator(Navbar));
