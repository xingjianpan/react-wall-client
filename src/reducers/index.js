import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducers';
import postlistReducer from './postlist_reducers';
import postItemReducer from './postitem_reducers';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  posts: postlistReducer,
  post: postItemReducer,
});

export default rootReducer;
