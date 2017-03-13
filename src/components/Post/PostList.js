import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';


// relative import
import { fetchPostList, resetPostList, setIgnoreLastFetch } from '../../actions';
import { hideNotification } from '../../actions';
import Post from './Post';
import UserNotification from '../Notification';

const POST_LIST_URL = 'http://localhost:8081/wall/posts/';


class PostList extends Component {
  componentDidMount() {
    if (!this.props.ignoreLastFetch) {
      this.props.fetchPostList(POST_LIST_URL);
    }
  }

  componentWillUnmount() {
    // this.props.resetNewsList();
    this.props.setIgnoreLastFetch(true);
  }

  fetchMore(url) {
    this.props.fetchPostList(url);
  }


  postListRender() {
    return (
      <div className="card-list">
        {this.props.postList.map(item => this.renderPostItem(item)) }
      </div>
    );
  }

  renderPostItem(post) {
    return (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        content={post.content}
        user={post.owner}
      />
    );
  }

  renderButton() {
    if (this.props.nextHref && this.props.prevHref) {
      return (
        <div>
          <span>
            <a href="#" onClick={() => { this.fetchMore(this.props.prevHref); }}>
              Previous Page
            </a>
          </span>
          <span className="page-control">
            <a href="#" onClick={() => { this.fetchMore(this.props.nextHref); }}>
              Next Page
            </a>
          </span>
        </div>
      );
    } else if (this.props.nextHref) {
      return <a href="#" onClick={() => { this.fetchMore(this.props.nextHref); }}>Next Page</a>
    } else if (this.props.prevHref) {
      return <a href="#" onClick={() => { this.fetchMore(this.props.prevHref); }}>Previous Page</a>
    }

    return <p></p>


  }


  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, we cannot retrieve any posts, please refresh。</p>;
    }
    if (this.props.isLoading) {
      return <Loading type="bars" color="#e3e3e3" />;
    }
    document.title = '知识卡片';
    return (
      <div>
        <div>
          {this.renderButton()}
          <p />
        </div>
        <div>
          {this.postListRender()}
        </div>
        <div>
          <p />
          {this.renderButton()}
        </div>

        <UserNotification
          isActive={this.props.isActive}
          message={this.props.message}
          action={this.props.action}
          onClick={() => {this.props.hideNotification(); }}
        />
      </div>

    );
  }
}

const mapStateToPros = (state) => {
  const { isLoading, postList, hasErrored,
          nextHref, prevHref, ignoreLastFetch,
        } = state.posts;

  const { isActive, message, action } = state.notifications;
  // debugger
  return {
    isLoading,
    postList,
    hasErrored,
    nextHref,
    prevHref,
    ignoreLastFetch,
    isActive,
    message,
    action,
  };
};

export default connect(mapStateToPros,
  { fetchPostList, resetPostList, setIgnoreLastFetch, hideNotification })(PostList);
