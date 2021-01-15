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
import AuthorizedRoute from '../helpers/AuthorizedRoute';
import Roles from '../helpers/Roles';

const FallBack = (props) => {
  return <div> URL Not Found </div>;
};

const App = (props) => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <AuthorizedRoute exact path="/data_library" component={DataLibrary} validRoles={[Roles.DEVELOPER]} />
        {/* <Route path="/data_library" component={DataLibrary} /> */}
        <AuthorizedRoute exact path="/models" component={Models} validRoles={[Roles.DEVELOPER]} />
        <AuthorizedRoute exact path="/select_data" component={UploadData} validRoles={[Roles.DEVELOPER]} />
        <AuthorizedRoute exact path="/login" component={Login} validRoles={[Roles.DEVELOPER]} />
        <AuthorizedRoute exact path="/data_library" component={DataLibrary} validRoles={[Roles.DEVELOPER]} />
        <AuthorizedRoute exact path="/create_model" component={CreateModel} validRoles={[Roles.DEVELOPER]} />
        <Route component={FallBack} />
      </Switch>
    </Router>
  );
};

export default withAuthenticator(App);

// ReactDOM.render(<App />, document.getElementById('main'));
