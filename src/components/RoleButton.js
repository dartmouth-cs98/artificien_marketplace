import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AntSwitch from './AntSwitch';
import { addRole } from '../store/reducers/role-reducer';
import { openModal } from '../store/reducers/modal-reducer';
import roleDict from '../store/roleDict';

/*
Toggles user role and displayed information/pages
Basis for restricted routes
*/

class RoleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedC: this.props.start,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
    if (event.target.checked) { // Flip to Dev
      this.setState({ checkedC: true });
      this.props.addRole(1);
    } else { // Flip to Client
      this.setState({ checkedC: false });
      this.props.addRole(0);
    }

    // check if redirect is necessary based on global role objects
    const pathname = window.location.href.split('/').pop();
    if (!(roleDict[pathname].includes(this.props.role))) {
      this.props.history.push('/profile');
      this.props.openModal(true);
    }
  };

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
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
