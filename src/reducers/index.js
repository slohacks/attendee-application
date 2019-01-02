import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authentication from './auth';
import signup from './signup';
import forgotPassword from './forgotPassword';
import questionList from './QuestionnaireReducers/questions';
import formResponses from './QuestionnaireReducers/formResponses';
import resumeResponse from './QuestionnaireReducers/resumeResponse';
import submissionResponse from './QuestionnaireReducers/submission';
import applicationResponse from './application';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authentication,
  newUser: signup,
  lostPass: forgotPassword,
  questions: questionList,
  responses: formResponses,
  file: resumeResponse,
  submission: submissionResponse,
  application: applicationResponse,
});

export default rootReducer;
