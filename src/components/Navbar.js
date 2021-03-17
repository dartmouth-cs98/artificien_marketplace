/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../style.scss';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
// import { getUser } from '../database/databaseCalls';
import { addRole } from '../store/reducers/role-reducer';
import { openModal } from '../store/reducers/modal-reducer';
import RoleButton from './RoleButton';

/*
Simple top navigation bar
Uses the subcomponents:
  - RoleButton
*/

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    Auth.currentSession()
      .then((data) => {
        console.log('adding role');
        this.props.addRole(1);
        this.props.openModal(false);
      }).catch(() => {
        console.log('caught navbar');
      });
  }

  renderDev = () => {
    console.log('rendering');
    return (
      <div>
        <div className="alert alert-danger" role="alert">
          Warning: Artificien is built to be used on a larger screen. Some formatting and features may be limited.
        </div>
        <div className="navbar-complete">
          <NavLink to="/" exact> <div className="logo" active /> </NavLink>
          <nav className="nav">
            <ul className="nav-ul">
              <li>
                <NavLink to="/user_guide"> User Guide </NavLink>
              </li>
              <li>
                <NavLink to="/tutorial"> Tutorial </NavLink>
              </li>
              <li>
                <NavLink to="/app_developer_documentation"> App Dev Docs </NavLink>
              </li>
              <li>
                <NavLink to="/profile"> Profile </NavLink>
              </li>
              <li>
                <NavLink to="/register_app"> Register App </NavLink>
              </li>
            </ul>
            <ul className="nav-role-button-ul">
              <li className="role-button">
                {this.props.role !== 2 && <RoleButton start={this.props.role} />}
              </li>
              <li className="signout-button">
                <button
                  type="button"
                  onClick={() => {
                    Auth.signOut();
                    this.props.history.push('/');
                    window.location.reload(false);
                  }}
                  variant="outlined"
                  id="signup-signin-button"
                  color="primary"
                > Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  renderEnterprise = () => {
    return (
      <div className="navbar-complete">
        <NavLink to="/" exact> <div className="logo" active /> </NavLink>
        <nav className="nav">
          <ul className="nav-ul">
            <li>
              <NavLink to="/user_guide"> User Guide </NavLink>
            </li>
            <li>
              <NavLink to="/tutorial"> Tutorial </NavLink>
            </li>
            <li>
              <NavLink to="/data_scientist_documentation"> Data Sci Docs </NavLink>
            </li>
            <li>
              <NavLink to="/profile"> Profile </NavLink>
            </li>
            <li>
              <NavLink to="/marketplace"> Marketplace </NavLink>
            </li>
            <li>
              <NavLink to="/models"> Models </NavLink>
            </li>
          </ul>
          <ul className="nav-role-button-ul">
            <li className="role-button">
              {this.props.role !== 2 && <RoleButton start={this.props.role} />}
            </li>
            <li className="signout-button">
              <button
                type="button"
                onClick={() => {
                  Auth.signOut();
                  this.props.history.push('/');
                  window.location.reload(false);
                }}
                variant="outlined"
                id="signup-signin-button"
                color="primary"
              > Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  renderGuest = () => {
    return (
      <div className="navbar-complete">
        <NavLink to="/" exact> <div className="logo" active /> </NavLink>
        <nav className="nav">
          <ul className="nav-ul">
            <li>
              <NavLink to="/"> Home </NavLink>
            </li>
            <li>
              <NavLink to="/user_guide"> User Guide </NavLink>
            </li>
          </ul>
          <ul className="nav-role-button-ul">
            <li className="role-button">
              {this.props.role !== 2 && <RoleButton start={this.props.role} />}
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    console.log(this.props.role);
    if (Number.parseInt(this.props.role, 10) === 0) {
      return (
        <div>{this.renderEnterprise()}</div>
      );
    } else if (Number.parseInt(this.props.role, 10) === 1) {
      return (
        <div>{this.renderDev()}</div>
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
export default withRouter(connect(mapStateToProps, { addRole, openModal })(Navbar)); // might be some sort of login flow thing here
