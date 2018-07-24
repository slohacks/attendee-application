import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authentication from './auth';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authentication,
});

export default rootReducer;
