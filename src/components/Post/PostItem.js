import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { browserHistory } from 'react-router';
// relative import
import { fetchPostItem, deletePost } from '../../actions';
import UserNotification from '../Notification';

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

  handleEdit() {
    const currentPath = this.props.location.pathname;
    browserHistory.push(`${currentPath}/edit`);
  }
  renderEditor(post){
    // show editor if current user is also the owner of the post
    if (this.props.user) {
      if (this.props.user.username === post.owner) {
        return (
          <div>
            <button onClick={() => { this.handleEdit(); }}>Edit</button>
            <button onClick={() => { this.props.deletePost(post); }}>Delete</button>
          </div>
        );
      }
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
      <div>
        <div className="card">
          <div className="card-block">
            <h4 className="card-title">{post.title}</h4>
            <p className="card-text">{post.content}</p>
          </div>

        </div>

        {this.renderEditor(post)}
        <UserNotification
          isActive='true'
          message='hello world'
          action='Dismiss'
           />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isLoading, post, hasErrored } = state.post;
  const { authenticated, user } = state.auth;


  return {
    isLoading,
    post,
    hasErrored,
    authenticated,
    user,
  };
};

export default connect(mapStateToProps, { fetchPostItem, deletePost })(PostItem);
