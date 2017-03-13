import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  isActive: false,
  message: 'this is a notification',
  action: 'dismisss',
};


export default (state = INITIAL_STATE, action) => {
  console.log('action: ', action);
  switch (action.type) {
    case actionTypes.HIDE_NOTIFICATION:
      return { ...state, isActive: false };
    default:
      return state;
  }
};
