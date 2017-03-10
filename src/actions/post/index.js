import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../../constants/actionTypes';
import { POST_ROOT_URL } from '../../services/api';
import { fetchPostList } from '../../actions/postlist';


export const addPost = ({ title, content }) => {
  return (dispatch) => {
    axios.post(
      `${POST_ROOT_URL}`,
      { title, content },
      { headers: { Authorization: `Token ${localStorage.getItem('token')}`} },
    )
    .then((response) => {
      browserHistory.push('/');
      dispatch(fetchPostList(POST_ROOT_URL));
    });
  };
};


export const postItemIsLoading = (bool) => {
  return {
    type: actionTypes.POST_ITEM_IS_LOADING,
    payload: bool,
  };
};

export const fetchPostItem = (id) => {
  return (dispatch) => {
    dispatch(postItemIsLoading(true));

    axios.get(`${POST_ROOT_URL}${id}/`)
      .then(response => dispatch(fetchPostItemSuccess(response)))
      .catch(()=> dispatch(fetchPostItemFailed(true)));
  };
};

export const fetchPostItemSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_POST_ITEM_SUCCESS,
    payload: response,
  };
};

export const fetchPostItemFailed = (bool) => {
  return {
    type: actionTypes.FETCH_POST_ITEM_FAILED,
    payload: bool,
  };
};

