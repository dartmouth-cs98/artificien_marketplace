/* eslint-disable react/no-deprecated */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withRouter } from 'react-router-dom';// Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../actions';

export default function withAuthorization(ComponentToBeRendered, validRoles) { // VR is integer
  class Authorize extends React.Component {
    componentDidMount() {
      try {
        if (!(validRoles.includes(Number.parseInt(this.props.role, 10)))) {
          this.props.history.push('/');
          this.props.openModal(true);
        } else {
          console.log('allowed');
        }
      } catch (error) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!(validRoles.includes(Number.parseInt(nextProps.role, 10)))) {
        this.props.history.push('/');
        this.props.openModal(true);
      } else {
        console.log('still allowed');
      }
    }

    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      role: state.roleReducer.role,
    };
  }

  return withRouter(connect(mapStateToProps, { openModal })(Authorize));
}
