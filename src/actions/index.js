import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from './types';

const ROOT_URL = 'http://localhost:8081/rest-auth';

export function signupUser({ email, password1, password2 }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/registration/`, { email, password1, password2 })
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
    axios.post(`${ROOT_URL}/login/`, { email, password }) // {email:email, password:password}
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

  }
}

export function clearError() {
  return {
    type: 'CLEAR_ERROR'
  }
}
