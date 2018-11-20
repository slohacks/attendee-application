import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authentication from './auth';
import questionList from './QuestionnaireReducers/questions';
import formResponses from './QuestionnaireReducers/formResponses';
import resumeResponse from './QuestionnaireReducers/resumeResponse';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authentication,
  questions: questionList,
  responses: formResponses,
  file: resumeResponse,
});

export default rootReducer;
