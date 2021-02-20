/* eslint-disable new-cap */
import '../style.scss';
import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// import { withAuthenticator } from '@aws-amplify/ui-react';

import DataLibrary from './DataLibrary';
import Models from './Models';
import UploadData from './UploadData';
import Welcome from './Welcome';
import Navbar from './Navbar';
import Login from './Login';
import CreateModel from './CreateModel';
import Roles from '../helpers/Roles';
import withAuthorization from '../helpers/withAuthorization';
import Profile from './Profile';
import Documentation from './Documentation';
import Tutorials from './Tutorials';

// const FallBack = (props) => {
//   return <div> No Authorized Access to this page! </div>;
// };

const App = (props) => {
  return (
    <Router>
      <Navbar style={{ 'font-family': 'Avenir' }} />
      <Switch>
        <Route exact path="/" component={withAuthorization(Welcome, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
        <Route exact path="/marketplace" component={withAuthorization(DataLibrary, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
        <Route exact path="/models" component={withAuthorization(Models, [Roles.DEVELOPER, Roles.CLIENT])} />
        <Route exact path="/upload_data" component={withAuthorization(UploadData, [Roles.DEVELOPER])} />
        <Route exact path="/login" component={withAuthorization(Login, [Roles.DEVELOPER, Roles.CLIENT])} />
        <Route exact path="/create_model" component={withAuthorization(CreateModel, [Roles.DEVELOPER, Roles.CLIENT])} />
        <Route exact path="/profile" component={withAuthorization(Profile, [Roles.DEVELOPER, Roles.CLIENT])} />
        <Route exact path="/documentation" component={withAuthorization(Documentation, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
        <Route exact path="/tutorials" component={withAuthorization(Tutorials, [Roles.DEVELOPER])} />
        {/* <Route component={withAuthorization(FallBack, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} /> */}
      </Switch>
    </Router>
  );
};

export default (App);

// ReactDOM.render(<App />, document.getElementById('main'));
