import { OPENAPPMODAL } from '../actionTypes';

/*
Triggers App Modal
*/

export function openAppModal(pay) {
  return {
    type: OPENAPPMODAL,
    payload: pay,
  };
}

const appReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case OPENAPPMODAL:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
