import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';


// relative import
import { fetchPostList, resetPostList, setIgnoreLastFetch } from '../actions';
import Post from './Post';

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
      <div className="list-group">
        {this.props.postList.map(item => this.renderPostItem(item)) }
      </div>
    );
  }

  renderPostItem(post) {
    return (
      <Post
        key={post.id}
        title={post.title}
        content={post.content}
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
    }

    return <a href="#" onClick={() => { this.fetchMore(this.props.prevHref); }}>Previous Page</a>

  }


  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, we cannot retrieve any posts, please refresh。</p>;
    }
    if (this.props.isLoading) {
      return <Loading type="bars" color="#e3e3e3" />;
    }
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
      </div>

    );
  }
}

const mapStateToPros = (state) => {
  const { isLoading, postList, hasErrored,
          nextHref, prevHref, ignoreLastFetch,
        } = state.posts;
  // debugger
  return {
    isLoading,
    postList,
    hasErrored,
    nextHref,
    prevHref,
    ignoreLastFetch,
  };
};

export default connect(mapStateToPros,
  { fetchPostList, resetPostList, setIgnoreLastFetch })(PostList);
