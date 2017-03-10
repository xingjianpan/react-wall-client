import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  post: {},
  hasErrored: false,
};


export default (state = INITIAL_STATE, action) => {
  // console.log('action: ', action);
  switch (action.type) {
    case actionTypes.POST_ITEM_IS_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_POST_ITEM_SUCCESS:
      return { ...state, post: action.payload.data, isLoading: false };
    case actionTypes.FETCH_POST_ITEM_FAILED:
      return { ...state, hasErrored: true };
    default:
      return state;
  }
};
