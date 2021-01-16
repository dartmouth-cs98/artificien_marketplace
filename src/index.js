import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import awsconfig from './aws-exports';
import App from './components/app';
import store from './store/store';

// Configure AWS Amplify
Amplify.configure(awsconfig);

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
