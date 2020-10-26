import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import '../style.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Login</h1>
            <br />
            <br />
            <div> Email Address</div>
            <Input placeholder="email@gmail.com" />
            <div> <i>We will never share your password with anyone else.</i></div>
            <br />
            <div> Password</div>
            <Input type="password" placeholder="password" />
          </div>
          <br />
          <div>
            <Button>Sign In</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
