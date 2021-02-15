import { ActionTypes } from '../actions';

const modalReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.OPENMODAL:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return {
        open: false,
      };
  }
};

export default modalReducer;
