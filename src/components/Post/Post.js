import React from 'react';
import { Link } from 'react-router';

const Post = ({ id, title, content, user }) => (
  <div className="card">
    <div className="card-block">
      <h4 className="card-title"> <Link to={`/post/${id}`}>{title} </Link></h4>
      <p className="card-text"> {content} </p>
    </div>
    <div className="card-block">
      <p className="card-creator">Crated By:{user}</p>
    </div>
  </div>
);

export default Post;
