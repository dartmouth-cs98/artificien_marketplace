import { OPENDATASETMODAL } from '../actionTypes';

/*
Triggers Dataset Modal
*/

export function openDatasetModal(pay) {
  return {
    type: OPENDATASETMODAL,
    payload: pay,
  };
}

const datasetReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case OPENDATASETMODAL:
      console.log(action.payload);
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};

export default datasetReducer;
