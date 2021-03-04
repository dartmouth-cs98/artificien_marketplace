/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../style.scss';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { getUser } from '../database/databaseCalls';
import { addRole } from '../store/reducers/role-reducer';
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

  componentDidMount() {
    Auth.currentSession()
      .then((data) => {
        const name = data.accessToken.payload.username;
        const callback = (successData, error) => { // requires current user to be in database
          if (error) {
            console.log(error);
          } else {
            console.log('');
            if (this.props.role === 2 && successData.Items.length > 0) {
              this.props.addRole(successData.Items[0].role.S); // can't use ! here, 0 is falsey, add to initial state to redux store
              console.log('adding role');
            }
          }
        };
        getUser(callback, name);
      }).catch(() => {
        console.log('caught navbar');
      });
  }

  // signOut = async () => {
  //   try {
  //     console.log('SIGNING OUT');
  //     await Auth.signOut();
  //   } catch (error) {
  //     console.log('error signing out: ', error);
  //   }
  // }

  renderDev = () => {
    console.log('rendering');
    return (
      <div className="navbar-complete">
        <NavLink to="/" exact> <div className="logo" active /> </NavLink>
        <nav className="nav">
          <ul className="nav-ul">
            <li>
              <NavLink to="/upload_data"> Upload Data </NavLink>
            </li>
            <li>
              <NavLink to="/profile"> Profile </NavLink>
            </li>
            <li>
              <NavLink to="/documentation"> Documentation </NavLink>
            </li>
            <li>
              <NavLink to="/how_it_works"> How Artificien Works </NavLink>
            </li>
          </ul>
          <ul className="nav-role-button-ul">
            <li className="role-button">
              {this.props.role !== 2 && <RoleButton />}
            </li>
            <li className="signout-button">
              <button
                type="button"
                onClick={() => {
                  Auth.signOut();
                  window.location.reload(false);
                }}
                variant="outlined"
                id="signup-signin-button"
                color="primary"
              > Signout
              </button>
            </li>
          </ul>
        </nav>
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
            <li>
              <NavLink to="/how_it_works"> How Artificien Works </NavLink>
            </li>
          </ul>
          <ul className="nav-role-button-ul">
            <li className="role-button">
              {this.props.role !== 2 && <RoleButton />}
            </li>
            <li className="signout-button">
              <button
                type="button"
                onClick={() => {
                  Auth.signOut();
                  window.location.reload(false);
                }}
                variant="outlined"
                id="signup-signin-button"
                color="primary"
              > Signout
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
              <NavLink to="/how_it_works"> How Artificien Works </NavLink>
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
export default withRouter(connect(mapStateToProps, { addRole })(Navbar)); // might be some sort of login flow thing here
