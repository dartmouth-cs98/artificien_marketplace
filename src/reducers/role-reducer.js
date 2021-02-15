import { ActionTypes } from '../actions';

const roleReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADDROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return {
        role: 2,
      };
  }
};

export default roleReducer;
