import { OPENERRORMODAL } from '../actionTypes';

export function openModal(pay) {
  return {
    type: OPENERRORMODAL,
    payload: pay,
  };
}

const modalReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case OPENERRORMODAL:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
