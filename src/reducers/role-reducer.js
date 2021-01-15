import { ActionTypes } from '../actions';

const roleReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADDROLE:
      console.log('add role');
      return {
        ...state,
        role: action.payload,
      };
    default:
      return 0;
  }
};

export default roleReducer;
