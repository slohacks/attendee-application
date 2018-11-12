import * as types from './types';
import { firebase, applicationsRef } from '../config/firebase';

export const signUp = values => (dispatch) => {
  firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      firebase.auth().currentUser.sendEmailVerification()
        .then(() => dispatch({ type: types.SIGN_UP_GUCCI, userCredential }))
        .catch(error => dispatch({ type: types.SIGN_UP_FAIL, error }));
    }).catch((error) => {
      dispatch({ type: types.SIGN_UP_FAIL, error });
    });
};

export const login = values => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      dispatch({ type: types.LOGIN_GUCCI, userCredential });
    }).catch((error) => {
      dispatch({ type: types.LOGIN_FAIL, error });
    });
};

export const signout = () => (dispatch) => {
  firebase.auth().signOut()
    .then(() => {
      dispatch({ type: types.SIGN_OUT_GUCCI });
    })
    .catch((error) => {
      dispatch({ type: types.SIGN_OUT_FAIL, error });
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
