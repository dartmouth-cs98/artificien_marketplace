// the starting point for your redux store
// this defines what your store state will look like
// import { combineReducers } from 'redux';

// import CountReducer from './count-reducer';

// const rootReducer = combineReducers({
//   count: CountReducer,
// });

const initState = {
  test: 'test',
};

const rootReducer = (state = initState, action) => {
  return state;
};

export default rootReducer;
