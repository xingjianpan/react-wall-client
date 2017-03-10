import React from 'react';


const Post = ({ title, content }) => (
  <div className="card">
    <div className="card-block">
      <h4 className="card-title"> {title} </h4>
      <p className="card-text"> {content} </p>
    </div>
  </div>
);

export default Post;
