import React from 'react';


const Post = ({ title, content }) => (
  <div className="list-group-item list-group-item-action">
    <h4> {title} </h4>
    <p> {content} </p>
  </div>
);

export default Post;
