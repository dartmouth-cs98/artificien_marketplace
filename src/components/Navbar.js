import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../style.scss';
import { connect } from 'react-redux';
import { addRole } from '../actions';
// import { withAuthenticator } from '@aws-amplify/ui-react';
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
      <div className="navbar-complete">
        <div className="logo" active />
        <nav className="nav">
          <ul className="nav-ul" style={{ 'font-family': 'Avenir', 'font-size': '1rem' }}>
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
              <NavLink to="/upload_data"> Data Upload </NavLink>
            </li>
            <li>
              <NavLink to="/profile"> Profile </NavLink>
            </li>
            <li>
              <NavLink to="/documentation"> Documentation </NavLink>
            </li>
          </ul>
          <ul className="nav-role-button-ul">
            <li className="role-button">
              {this.props.role !== 2 && <RoleButton />}
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

// export default withRouter(withAuthenticator(Navbar)); // might be some sort of login flow thing here
export default withRouter(connect(mapStateToProps, { addRole })(Navbar)); // might be some sort of login flow thing here
