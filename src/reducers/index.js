import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authentication from './auth';
import questionList from './QuestionnaireReducers/questions';
import formResponses from './QuestionnaireReducers/formResponses';
import fileName from './QuestionnaireReducers/fileName';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authentication,
  questions: questionList,
  responses: formResponses,
  file: fileName,
});

export default rootReducer;
