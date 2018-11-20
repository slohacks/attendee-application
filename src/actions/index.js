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
  dispatch({ type: types.LOGIN_ATTEMPT });
  firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      const {
        user: { emailVerified },
      } = userCredential;
      if (emailVerified) {
        dispatch({ type: types.LOGIN_GUCCI, userCredential });
      } else {
        dispatch({ type: types.LOGIN_FAIL, error: { message: 'Email not verified, please verify your email.' } });
      }
    }).catch((error) => {
      dispatch({ type: types.LOGIN_FAIL, error });
    });
};
export const forgotPassword = values => (dispatch) => {
  firebase.auth().sendPasswordResetEmail(values.email)
    .then((userCredential) => {
      dispatch({ type: types.FORGOT_PASS_GUCCI, userCredential });
    }).catch((error) => {
      dispatch({ type: types.FORGOT_PASS_FAIL, error });
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
  dispatch({ type: types.UPLOAD_RESUME_ATTEMPT });
  const storageRef = firebase.storage().ref().child('resumes').child(`${user.uid}.pdf`);

  try {
    storageRef.put(resume).then(() => {
      dispatch({ type: types.UPLOAD_RESUME_GUCCI, resume });
      onChange(resume.name);
    }).catch(() => {
      dispatch({ type: types.UPLOAD_RESUME_FAIL, error: "File submitted isn't of type PDF or is too large." });
    });
  } catch (error) {
    dispatch({ type: types.UPLOAD_RESUME_FAIL });
  }
};

export const submitApp = (user, form) => (dispatch) => {
  const newForm = { ...form, time: firebase.firestore.Timestamp.now() };
  applicationsRef.doc(user.uid).set(newForm).then(() => {
    dispatch({ type: types.SUBMIT_GUCCI });
  }).catch((error) => {
    dispatch({ type: types.SUBMIT_FAIL, error });
  });
};
