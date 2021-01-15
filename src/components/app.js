import '../style.scss';
import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { withAuthenticator } from '@aws-amplify/ui-react';

import DataLibrary from './DataLibrary';
import Models from './Models';
import UploadData from './UploadData';
import Welcome from './Welcome';
import Navbar from './Navbar';
import Login from './Login';
import CreateModel from './CreateModel';
import Profile from './Profile';

const FallBack = (props) => {
  return <div> URL Not Found </div>;
};

const App = (props) => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/data_library" component={DataLibrary} />
        <Route exact path="/models" component={Models} />
        <Route exact path="/select_data" component={UploadData} />
        <Route exact path="/login" component={Login} />
        <Route path="/data_library" component={DataLibrary} />
        <Route exact path="/create_model" component={CreateModel} />
        <Route exact path="/profile" component={Profile} />
        <Route component={FallBack} />
      </Switch>
    </Router>
  );
};

export default withAuthenticator(App);

// ReactDOM.render(<App />, document.getElementById('main'));
