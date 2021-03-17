import { OPENLOGINMODAL } from '../actionTypes';

/*
Triggers Login Modal
*/

export function openLoginModal(pay) {
  return {
    type: OPENLOGINMODAL,
    payload: pay,
  };
}

const LoginReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case OPENLOGINMODAL:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;
