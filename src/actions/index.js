import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  POST_LIST_IS_LOADING,
  FETCH_POST_LIST_SUCCESS,
  FETCH_POST_LIST_FAILED,
  RESET_POST_LIST,
  SET_IGNORE_LAST_FETCH,

} from './types';


const AUTH_ROOT_URL = 'http://localhost:8081/rest-auth';

export function signupUser({ email, password1, password2 }) {
  return (dispatch) => {
    axios.post(`${AUTH_ROOT_URL}/registration/`, { email, password1, password2 })
      .then((response) => {
        // if request is good
        // - update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - save the JWT token, use localstorage
        localStorage.setItem('token', response.data.key);
        // - redirect to the route /resources
        browserHistory.push('/resources');
      })
      .catch((error) => {
        const errObj = error.response.data;
        const errArray = Object.keys(errObj).map(function (key) { return errObj[key]; });
        // NOTE here need to use error.response
        dispatch(authError(errArray));
      });
  };
}


export function signinUser({ email, password }) {

  // use 'redux-thunk' to return an function
  // instead an object
  return (dispatch) => {
    // submit email/password to server
    axios.post(`${AUTH_ROOT_URL}/login/`, { email, password }) // {email:email, password:password}
      .then((response) => {
          // if request is good
          // - update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - save the JWT token, use localstorage
        localStorage.setItem('token', response.data.key);
        // - redirect to the route /feature
        browserHistory.push('/resources');
      })
      .catch(() => {
        // if request is bad
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER,

  };
}

export function clearError() {
  return {
    type: 'CLEAR_ERROR',
  };
}


// posts functions

export const fetchPostListSuccess = (response) => {
  // console.log(response)
  return {
    type: FETCH_POST_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchPostListFailed = (bool) => {
  return {
    type: FETCH_POST_LIST_FAILED,
    payload: bool,
  };
};

export const setIgnoreLastFetch = (bool) => {
  return {
    type: SET_IGNORE_LAST_FETCH,
    payload: bool,
  };
};

export const postListIsLoading = (bool) => {
  return {
    type: POST_LIST_IS_LOADING,
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
    type: RESET_POST_LIST,
  };
};

