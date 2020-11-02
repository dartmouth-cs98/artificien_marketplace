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
import SelectData from './SelectData';
import Welcome from './Welcome';
import Navbar from './Navbar';
import Login from './Login';
import CreateModel from './CreateModel';
import UploadModel from './UploadModel';
import ViewModel from './ViewModel';
import ViewResults from './ViewResults';

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
        <Route exact path="/select_data" component={SelectData} />
        <Route exact path="/login" component={Login} />
        <Route path="/data_library" component={DataLibrary} />
        <Route exact path="/create_model" component={CreateModel} />
        <Route exact path="/upload_model" component={UploadModel} />
        <Route exact path="/view_model" component={ViewModel} />
        <Route exact path="/view_results" component={ViewResults} />
        <Route component={FallBack} />
      </Switch>
    </Router>
  );
};

export default withAuthenticator(App);

// ReactDOM.render(<App />, document.getElementById('main'));
