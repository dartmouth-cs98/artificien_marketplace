import { ADDROLE } from '../actionTypes';

export function addRole(pay) {
  return {
    type: ADDROLE,
    payload: pay,
  };
}

const roleReducer = (state = { role: 2 }, action) => {
  switch (action.type) {
    case ADDROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default roleReducer;
