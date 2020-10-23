import React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <p>Work In Progress</p>
      <Link to="/select_data">
        <button type="button">
          Go to Select Data Page
        </button>
      </Link>
    </div>

  );
};

export default Login;
