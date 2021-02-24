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

import BottomNav from './BottomNav';
import Marketplace from './Marketplace';
import Models from './Models';
import UploadData from './UploadData';
import Welcome from './Welcome';
import Navbar from './Navbar';
import CreateModel from './CreateModel';
import Roles from '../helpers/Roles';
import withAuthorization from '../helpers/withAuthorization';
import Profile from './Profile';
import Documentation from './Documentation';
import Tutorials from './Tutorials';
import AboutUs from './AboutUs';
import Careers from './Careers';
import Press from './Press';

// const FallBack = (props) => {
//   return <div> No Authorized Access to this page! </div>;
// };

// CHANGE BACK: models, upload data, create model, profile, tutorials
const App = (props) => {
  return (
    <>
      <Router>
        <Navbar style={{ 'font-family': 'Avenir' }} />
        <Switch>
          <Route exact path="/" component={withAuthorization(Welcome, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/marketplace" component={withAuthorization(Marketplace, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/models" component={withAuthorization(Models, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/upload_data" component={withAuthorization(UploadData, [Roles.DEVELOPER, Roles.GUEST])} />
          <Route exact path="/create_model" component={withAuthorization(CreateModel, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/profile" component={withAuthorization(Profile, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/documentation" component={withAuthorization(Documentation, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/tutorials" component={withAuthorization(Tutorials, [Roles.DEVELOPER, Roles.GUEST])} />
          <Route exact path="/about_us" component={withAuthorization(AboutUs, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/careers" component={withAuthorization(Careers, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          <Route exact path="/press" component={withAuthorization(Press, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} />
          {/* <Route component={withAuthorization(FallBack, [Roles.DEVELOPER, Roles.CLIENT, Roles.GUEST])} /> */}
        </Switch>
        <BottomNav />
      </Router>
    </>
  );
};

export default (App);

// ReactDOM.render(<App />, document.getElementById('main'));
