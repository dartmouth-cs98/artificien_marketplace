import { INCREMENT, DECREMENT } from '../actionTypes';

export function increment() {
  return {
    type: INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: DECREMENT,
    payload: null,
  };
}
const CountReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default CountReducer;
