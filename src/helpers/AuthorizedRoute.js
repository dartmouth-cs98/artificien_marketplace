/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Higher-order component to role-restrict access to routes
const AuthorizedRoute = ({
  component: Component, path, exact = true, validRoles, ...rest
}) => {
  const role = 1; // TODO: find user role from redux??
  const isLoggedIn = true; // !!uid; // TODO: GET THIS FROM COGNITO - SHOULD BE ONLY CRITERION FOR WHETHER USER IS A GO TO SEE VARIABEL
  const isValidRole = validRoles.includes(role);

  const message = isLoggedIn ? 'You do not have access to that page' : 'Please log in to view that page';

  // this shit doesn't matter
  if (!isLoggedIn || !isValidRole) { console.log('you about to get redirected'); }
  if (isLoggedIn && !isValidRole) { console.log('you da wrong guy'); }

  return (
    <Route
      path={path}
      exact={exact}
      {...rest}
      render={(props) => {
        return isLoggedIn && isValidRole
          ? <Component {...props} />
          : (
            <Redirect
              to={{
                pathname: '/', // TODO: Send back to sign-in rather than homepage
                state: {
                  requestedPath: path,
                  error: message,
                },
              }}
            />
          );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.role, // TODO: test - not sure what's goin on here, can we get redux to functional components?
  };
};

export default withRouter(connect(mapStateToProps)(AuthorizedRoute));
