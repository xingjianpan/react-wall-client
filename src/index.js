import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import requireAuth from './components/require_authentication';

// mine
import App from './components/App';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Resouces from './components/Resource';
import PostList from './components/PostList';

// reducers
import reducers from './reducers';
import {AUTH_USER} from './actions/types';

// css
// import './index.css';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
const token = localStorage.getItem('token');

// if we have a token, consider the use to be signin
if (token) {
  // we need to update the application state
  store.dispatch({type: AUTH_USER})
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PostList}/>
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="resources" component={requireAuth(Resouces)} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
