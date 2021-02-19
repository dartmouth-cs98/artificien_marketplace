import { OPENMODAL } from '../actionTypes';

export function openModal(pay) {
  return {
    type: OPENMODAL,
    payload: pay,
  };
}

const modalReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case OPENMODAL:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
