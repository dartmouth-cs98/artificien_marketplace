import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
// import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import AntSwitch from './AntSwitch';
import { addRole } from '../store/reducers/role-reducer';
// import {
//   getUser,
// } from '../database/databaseCalls';
import { openModal } from '../store/reducers/modal-reducer';
import roleDict from '../store/roleDict';

class RoleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedC: this.props.start,
    };
  }

  handleChange = (event) => {
    console.log('handling change');
    this.setState({ [event.target.name]: event.target.checked });
    console.log(event.target.checked);
    if (event.target.checked) { // Dev
      this.setState({ checkedC: true });
      console.log('adding role 1');
      this.props.addRole(1);
    } else { // Client
      this.setState({ checkedC: false });
      console.log('adding role 0');
      this.props.addRole(0);
    }

    const pathname = window.location.href.split('/').pop();
    if (!(roleDict[pathname].includes(this.props.role))) {
      console.log('redirect');
      this.props.history.push('/profile');
      this.props.openModal(true);
    } else {
      console.log('staying');
    }
  };

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    console.log(this.state.checkedC);
    return (
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Data Scientist</Grid>
        <Grid item>
          <AntSwitch checked={this.state.checkedC} onChange={this.handleChange} name="checkedC" />
        </Grid>
        <Grid item>App Developer</Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

export default withRouter(connect(mapStateToProps, { addRole, openModal })(RoleButton));
