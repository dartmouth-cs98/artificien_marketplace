import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Amplify from 'aws-amplify';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import awsconfig from './aws-exports';
import rootReducer from './reducers/index';
import App from './components/app';

// Configure AWS Amplify
Amplify.configure(awsconfig);

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know

// this is wrong somehow
const store = createStore(rootReducer, {}, compose(
  applyMiddleware(),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// const store = createStore(rootReducer, devToolsEnhancer());

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
