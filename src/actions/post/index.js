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

export const editPost = (post) => {
  const { id, title, content } = post;
  return (dispatch) => {
    axios.put(
      `${POST_ROOT_URL}${id}/`,
      { title, content },
      { headers: { Authorization: `Token ${localStorage.getItem('token')}` }},
    )
    .then((response) => {
      browserHistory.push(`/post/${id}`);
    });
  };
};


export const deletePost = (post) => {

  return (dispatch) => {
    //  The second parameter to axios.delete is config, not data
    axios.delete(
      `${POST_ROOT_URL}${post.id}/`,
      { headers: { Authorization: `Token ${localStorage.getItem('token')}`} },
    ).then(() => {
      browserHistory.push('/');
      // refresh
      dispatch(fetchPostList(POST_ROOT_URL));
    });
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

