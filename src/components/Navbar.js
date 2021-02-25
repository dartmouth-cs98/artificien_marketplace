import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../style.scss';
import { connect } from 'react-redux';
// import { addRole } from '../store/reducers/role-reducer';
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

  renderDev = () => {
    console.log('rendering');
    return (
      <div className="navbar-complete">
        <div className="logo" active />
        <nav className="nav">
          <ul className="nav-ul">
            <li>
              <NavLink to="/" exact> Home </NavLink>
            </li>
            <li>
              <NavLink to="/upload_data"> Upload Data </NavLink>
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
  };

  renderEnterprise = () => {
    return (
      <div className="navbar-complete">
        <div className="logo" active />
        <nav className="nav">
          <ul className="nav-ul">
            <li>
              <NavLink to="/" exact> Home </NavLink>
            </li>
            <li>
              <NavLink to="/marketplace"> Marketplace </NavLink>
            </li>
            <li>
              <NavLink to="/models"> My Models </NavLink>
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

  renderGuest = () => {
    return (
      <div className="navbar-complete">
        <div className="logo" active />
        <nav className="nav">
          <ul className="nav-ul">
            <li>
              <NavLink to="/" exact> Home </NavLink>
            </li>
            <li>
              <NavLink to="/marketplace"> Marketplace </NavLink>
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

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    console.log(this.props.role);
    if (this.props.role === 0) {
      return (
        <div>{this.renderDev()}</div>
      );
    } else if (this.props.role === 1) {
      return (
        <div>{this.renderEnterprise()}</div>
      );
    } else {
      return (
        <div>{this.renderGuest()}</div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

// export default withRouter(withAuthenticator(Navbar)); // might be some sort of login flow thing here
export default withRouter(connect(mapStateToProps)(Navbar)); // might be some sort of login flow thing here
