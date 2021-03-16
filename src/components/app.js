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

// import BottomNav from './BottomNav';
import Marketplace from './Marketplace';
import Models from './Models';
import RegisterApp from './RegisterApp';
import Welcome from './Welcome';
import Navbar from './Navbar';
import CreateModel from './CreateModel';
import Roles from '../helpers/Roles';
import withAuthorization from '../helpers/withAuthorization';
import Profile from './Profile';
import DataScientistDocumentation from './DataScientistDocumentation';
import AppDeveloperDocumentation from './AppDeveloperDocumentation';
import Tutorial from './Tutorial';
import AboutUs from './AboutUs';
import Careers from './Careers';
import Press from './Press';
import UserGuide from './UserGuide';
import AuthPage from './AuthPage';
import BottomNav from './BottomNav';

function App(props) {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={withAuthorization(Welcome, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/marketplace" component={withAuthorization(Marketplace, [Roles.CLIENT])} />
          <Route exact path="/models" component={withAuthorization(Models, [Roles.CLIENT])} />
          <Route exact path="/register_app" component={withAuthorization(RegisterApp, [Roles.DEVELOPER])} />
          <Route exact path="/create_model" component={withAuthorization(CreateModel, [Roles.CLIENT])} />
          <Route exact path="/profile" component={withAuthorization(Profile, [Roles.DEVELOPER, Roles.CLIENT])} />
          <Route exact path="/data_scientist_documentation" component={withAuthorization(DataScientistDocumentation, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/app_developer_documentation" component={withAuthorization(AppDeveloperDocumentation, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/tutorial" component={withAuthorization(Tutorial, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/about_us" component={withAuthorization(AboutUs, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/careers" component={withAuthorization(Careers, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/press" component={withAuthorization(Press, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/user_guide" component={withAuthorization(UserGuide, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/auth" component={withAuthorization(AuthPage, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
        </Switch>
        <BottomNav />
      </Router>
    </>
  );
}

export default (App);

// ReactDOM.render(<App />, document.getElementById('main'));
