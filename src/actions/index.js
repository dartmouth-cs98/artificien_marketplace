// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  ADDROLE: 'ADDROLE',
  OPENMODAL: 'OPENMODAL',
};

export function addRole(pay) {
  return {
    type: ActionTypes.ADDROLE,
    payload: pay,
  };
}

export function openModal(pay) {
  return {
    type: ActionTypes.OPENMODAL,
    payload: pay,
  };
}

export function increment() {
  return {
    type: ActionTypes.INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: ActionTypes.DECREMENT,
    payload: null,
  };
}
