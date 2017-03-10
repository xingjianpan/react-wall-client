import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import requireAuth from './components/Auth/require_authentication';
import Signin from './components/Auth/Signin';
import Signout from './components/Auth/Signout';
import Signup from './components/Auth/Signup';
import PostList from './components/Post/PostList';
import AddPost from './components/Post/AddPost';
import PostDetail from './components/Post/PostDetail';
import * as actionTypes from './constants/actionTypes';
import configureStore from './stores/configureStore';
// css
// import './index.css';


const store = configureStore();
const token = localStorage.getItem('token');
// if we have a token, consider the use to be signin
if (token) {
  // we need to update the application state
  store.dispatch({ type: actionTypes.AUTH_USER });
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PostList}/>
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="/post/:postId" component={PostDetail} />
        <Route path="addpost" component={requireAuth(AddPost)} />
        <Route path="*" component={PostList} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
