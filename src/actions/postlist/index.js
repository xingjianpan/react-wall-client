import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../../constants/actionTypes';
import { POST_ROOT_URL } from '../../services/api';


export const fetchPostListSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_POST_LIST_SUCCESS,
    payload: response,
  };
};


export const fetchPostListFailed = (bool) => {
  return {
    type: actionTypes.FETCH_POST_LIST_FAILED,
    payload: bool,
  };
};

export const setIgnoreLastFetch = (bool) => {
  return {
    type: actionTypes.SET_IGNORE_LAST_FETCH,
    payload: bool,
  };
};

export const postListIsLoading = (bool) => {
  return {
    type: actionTypes.POST_LIST_IS_LOADING,
    payload: bool,
  };
};

export const fetchPostList = (url) => {
  return (dispatch) => {
    dispatch(postListIsLoading(true));

    axios.get(url)
      .then(response => {
        dispatch(fetchPostListSuccess(response))
      })
      .catch(() => dispatch(fetchPostListFailed(true)));
  };
};

export const resetPostList = () => {
  return {
    type: actionTypes.RESET_POST_LIST,
  };
};




