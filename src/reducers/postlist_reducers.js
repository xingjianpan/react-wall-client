// https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3#.kcdd1ivn5

import {
  POST_LIST_IS_LOADING,
  FETCH_POST_LIST_SUCCESS,
  FETCH_POST_LIST_FAILED,
  RESET_POST_LIST,
  SET_IGNORE_LAST_FETCH,
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: true,
  postList: [],
  hasErrored: false,
  nextHref: null,
  prevHref: null,
  ignoreLastFetch: null,
};


export default (state = INITIAL_STATE, action) => {
  // console.log('action: ', action);
  switch (action.type) {
    case POST_LIST_IS_LOADING:
      return { ...state, isLoading: true };
    case FETCH_POST_LIST_SUCCESS:
      return { ...state,
        postList: action.payload.data.results,
        isLoading: false,
        nextHref: action.payload.data.next,
        prevHref: action.payload.data.previous,
        ignoreLastFetch: false,
      };
    case FETCH_POST_LIST_FAILED:
      return { ...state, hasErrored: true };
    case RESET_POST_LIST:
      return INITIAL_STATE;
    case SET_IGNORE_LAST_FETCH:
      return { ...state, ignoreLastFetch: true };
    default:
      return state;
  }
};
