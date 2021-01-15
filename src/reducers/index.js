// the starting point for your redux store
// this defines what your store state will look like

import { combineReducers } from 'redux';
import CountReducer from './count-reducer';
import roleReducer from './role-reducer';

const rootReducer = combineReducers({
  CountReducer,
  roleReducer,
});

export default rootReducer;
