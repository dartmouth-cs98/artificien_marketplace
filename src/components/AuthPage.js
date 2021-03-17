import React, { Component } from 'react';
import '../style.scss';
// import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import AuthStateApp from './AuthStateApp';

/*
Separate page for authentication, includes cognito form
*/

class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // does not really get used, this page is relevant to signin
  renderSignOutButton = () => {
    return (
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
      > Signout
      </button>
    );
  }

  render() {
    console.log(this.props.role);
    return (
      <>
        {Number.parseInt(this.props.role, 10) === 2 && <AuthStateApp signin={false} />}
        {Number.parseInt(this.props.role, 10) !== 2 && this.renderSignOutButton() }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
    open: state.modalReducer.open,
  };
};

export default connect(mapStateToProps)(AuthPage);
