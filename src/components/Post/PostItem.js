import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Loading from 'react-loading';

// relative import
import { fetchPostItem } from '../../actions';
import Post from './Post';

class PostItem extends Component {
  componentDidMount() {
    this.props.fetchPostItem(this.props.params.postId);
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.params.postId;
    const newId = this.props.params.postId;
    if (newId !== oldId) {
      this.props.fetchNewsItem(newId);
    }
  }

  render() {
    const post = this.props.post;
    if (this.props.hasErrored) {
      return <p>抱歉，读取文章出错，请刷新浏览器后再试试。</p>;
    }
    if (this.props.isLoading) {
      return <Loading type="bars" color="#e3e3e3" />;
    }
    document.title = this.props.post.title;
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{post.title}</h4>
          <p className="card-text">{post.content}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isLoading, post, hasErrored } = state.post;
  console.log(post)
  return {
    isLoading,
    post,
    hasErrored,
  };
};

export default connect(mapStateToProps, { fetchPostItem })(PostItem);
