import * as types from './types';
import { firebase, applicationsRef } from '../config/firebase';

export function signUp(values) {
  return {
    type: types.SIGN_UP_GUCCI,
    payload: values,
  };
}

export const login = values => (dispatch) => {
  console.log(values);
  firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(() => {
    dispatch(() => ({ type: types.LOGIN_GUCCI, payload: values }));
    console.log('success');
  }).catch((error) => {
    dispatch(() => ({ type: types.LOGIN_FAIL, payload: error }));
    console.log('unsuccess', error);
  });
};

export function saveFile(fileName) {
  return {
    type: types.FILE_NAME,
    payload: fileName,
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
