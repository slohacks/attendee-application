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

export const signout = () => (dispatch) => {
  firebase.auth().signOut()
    .then(() => {
      dispatch({ type: types.SIGN_OUT_GUCCI });
    })
    .catch((error) => {
      dispatch({ type: types.SIGN_OUT_FAIL, error });
    });
};

export function submitResponse(formProps) {
  return {
    type: types.SAVE_RESPONSE,
    payload: formProps,
  };
}

export const uploadResume = (user, resume, onChange) => (dispatch) => {
  const storageRef = firebase.storage().ref().child('resumes').child(`${user.uid}.pdf`);

  storageRef.put(resume).then(() => {
    dispatch({ type: types.UPLOAD_RESUME_GUCCI, resume });
    onChange(resume.name);
  }).catch((error) => {
    dispatch({ type: types.UPLOAD_RESUME_FAIL, error });
  });
};

export const submitApp = (user, form) => (dispatch) => {
  applicationsRef.doc(user.uid).set(form).then(() => {
    dispatch({ type: types.SUBMIT_GUCCI });
  }).catch((error) => {
    dispatch({ type: types.SUBMIT_FAIL, error });
  });
};
