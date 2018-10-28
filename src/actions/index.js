import * as types from './types';
import { firebase, applicationsRef } from '../config/firebase';

export function signUp(values) {
  return {
    type: types.SIGN_UP_GUCCI,
    payload: values,
  };
}

export const login = values => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      dispatch({ type: types.LOGIN_GUCCI, userCredential });
    }).catch((error) => {
      dispatch({ type: types.LOGIN_FAIL, error });
    });
};

export function saveFile(fileName) {
  return {
    type: types.FILE_NAME,
    payload: fileName,
  };
}

export function submitResponse(formProps) {
  return {
    type: types.SAVE_RESPONSE,
    payload: formProps,
  };
}

export const submitApp = form => (dispatch) => {
  const user = firebase.auth().currentUser;

  if (user) {
    applicationsRef.doc(user.uid).set(form);
    dispatch(() => ({ type: types.SUBMIT_GUCCI }));
  } else {
    dispatch(() => ({ type: types.SUBMIT_FAIL }));
  }
};
