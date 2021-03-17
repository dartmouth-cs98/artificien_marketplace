/* eslint-disable react/no-deprecated */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withRouter } from 'react-router-dom';// Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../store/reducers/modal-reducer';

/*
Functional Component for route restriction
Applied to each page to ensure proper users have access
Redirects to profile page and pops up error modal
*/

export default function withAuthorization(ComponentToBeRendered, validRoles) { // VR is integer
  class Authorize extends React.Component {
    componentDidMount() {
      try {
        if (!(validRoles.includes(Number.parseInt(this.props.role, 10)))) {
          this.props.history.push('/'); // this isn't allowed
          this.props.openModal(true);
        }
      } catch (error) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!(validRoles.includes(Number.parseInt(nextProps.role, 10)))) {
        this.props.history.push('/profile');
        this.props.openModal(true);
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
