import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import AntSwitch from './AntSwitch';
import { addRole } from '../store/reducers/role-reducer';
import {
  getUser,
} from '../database/databaseCalls';

class RoleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedC: true,
    };
  }

  componentDidMount() {
    Auth.currentSession()
      .then((data) => {
        console.log(data);
        const name = data.accessToken.payload.username;
        const callback = (successData, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log('switch role: ');
            console.log(successData.Items[0].role.S);
            const switchStartState = !(successData.Items[0].role.S);
            this.setState({ checkedC: !switchStartState }); // switch starts as whatever role they have in DB (optional)
          }
        };
        getUser(callback, name);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
    if (event.target.checked) { // Dev
      this.props.addRole(1);
    } else { // Client
      this.props.addRole(0);
    }
  };

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    console.log('switch render');
    return (
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Client</Grid>
        <Grid item>
          <AntSwitch checked={this.state.checkedC} onChange={this.handleChange} name="checkedC" />
        </Grid>
        <Grid item>Dev</Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
  };
};

export default connect(mapStateToProps, { addRole })(RoleButton);
