import
{
  SIGN_UP,
  LOGIN,
  SAVE_RESPONSE,
  FILE_NAME,
} from './types';
import { firebase, applicationsRef } from '../config/firebase';

export function signUp(values) {
  return {
    type: SIGN_UP,
    payload: values,
  };
}

export const login = values => (dispatch) => {
  console.log(values);
  firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(() => {
    dispatch(() => ({ type: 'LOGIN_SUCCESSFUL', payload: values }));
    console.log('success');
  }).catch((error) => {
    dispatch(() => ({ type: 'LOGIN_UNSUCCESSFUL', payload: error }));
    console.log('unsuccess', error);
  });
};

export function submitResponse(formProps) {
  return {
    type: SAVE_RESPONSE,
    payload: formProps,
  };
}

export function saveFile(fileName) {
  return {
    type: FILE_NAME,
    payload: fileName,
  };
}

export const submitApp = form => (dispatch) => {
  const user = firebase.auth().currentUser;

  if (user) {
    applicationsRef.doc(user.uid).set(form);
    dispatch(() => ({ type: 'SUBMIT_APPLICATION' }));
  } else {
    dispatch(() => ({ type: 'SUBMIT_APPLICATION_FAIL' }));
  }
};
