import React, { Component } from 'react';

const PostDetail = (props) => {
  return <p> {props.params.postId}</p>;
};

export default PostDetail;
