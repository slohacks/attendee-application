import axios from "axios";
import * as types from "./types";
// import {
//   firebase,
//   applicationsRef,
//   rsvpRef,
// } from '../config/firebase';

const API_PATH = "https://slohacks-backend-api.herokuapp.com";

export const signUp = (values, callback) => dispatch => {
  dispatch({ type: types.SIGN_UP_ATTEMPT });
  axios
    .post(`${API_PATH}/users/signup`, {
      email: values.email,
      password: values.password
    })
    .then(response => {
      const userCredential = response.data;
      dispatch({ type: types.SIGN_UP_GUCCI, userCredential });
      callback();
    })
    .catch(error => {
      const { errorMessage } = error.response.data;
      dispatch({ type: types.SIGN_UP_FAIL, errorMessage });
    });
};

export const login = values => dispatch => {
  dispatch({ type: types.LOGIN_ATTEMPT });
  axios
    .post(`${API_PATH}/users/login`, {
      email: values.email,
      password: values.password
    })
    .then(response => {
      const userCredential = response.data;
      dispatch({ type: types.LOGIN_GUCCI, userCredential });
    })
    .catch(error => {
      const { errorMessage } = error.response.data;
      dispatch({ type: types.LOGIN_FAIL, errorMessage });
    });
};

export const rsvpResponse = (user, form, push) => dispatch => {
  // rsvpRef
  //   .doc(user.uid)
  //   .set(form)
  //   .then(() => {
  //     dispatch({ type: types.UPDATE_RSVP, rsvpVal: true });
  //     push('/dashboard');
  //   });
};

export const forgotPassword = (values, callback) => dispatch => {
  dispatch({ type: types.FORGOT_PASS_ATTEMPT });
  // firebase
  //   .auth()
  //   .sendPasswordResetEmail(values.email)
  //   .then((userCredential) => {
  //     dispatch({ type: types.FORGOT_PASS_GUCCI, userCredential });
  //     callback();
  //   })
  //   .catch((error) => {
  //     dispatch({ type: types.FORGOT_PASS_FAIL, error });
  //   });
};

export const signout = () => dispatch => {
  // firebase
  //   .auth()
  //   .signOut()
  //   .then(() => {
  //     dispatch({ type: types.SIGN_OUT_GUCCI });
  //   })
  //   .catch((error) => {
  //     dispatch({ type: types.SIGN_OUT_FAIL, error });
  //   });
};

export function submitResponse(formProps) {
  return {
    type: types.SAVE_RESPONSE,
    payload: formProps
  };
}

export const uploadResume = (user, resume, onChange) => dispatch => {
  dispatch({ type: types.UPLOAD_RESUME_ATTEMPT });
  // const storageRef = firebase
  //   .storage()
  //   .ref()
  //   .child('resumes')
  //   .child(`${user.uid}.pdf`);

  // try {
  //   storageRef
  //     .put(resume)
  //     .then(() => {
  //       dispatch({ type: types.UPLOAD_RESUME_GUCCI, resume });
  //       onChange(resume.name);
  //     })
  //     .catch(() => {
  //       dispatch({
  //         type: types.UPLOAD_RESUME_FAIL,
  //         error: 'File submitted isn\'t of type PDF or is too large.',
  //       });
  //     });
  // } catch (error) {
  //   dispatch({ type: types.UPLOAD_RESUME_FAIL });
  // }
};

export const clearResume = () => {
  return {
    type: types.CLEAR_RESUME_ERROR
  };
};

export const submitApp = (user, form) => dispatch => {
  dispatch({ type: types.ATTEMPT_SUBMISSION });
  // const newForm = {
  //   ...form,
  //   time: firebase.firestore.Timestamp.now(),
  //   email: firebase.auth().currentUser.email,
  // };
  // applicationsRef
  //   .doc(user.uid)
  //   .set(newForm)
  //   .then(() => {
  //     applicationsRef
  //       .doc(user.uid)
  //       .get()
  //       .then((doc) => {
  //         dispatch({
  //           type: types.UPDATE_APPLICATION_TRUE,
  //           app: doc.data(),
  //           rsvpInv: false,
  //         });
  //       });
  //     dispatch({ type: types.SUBMISSION_GUCCI });
  //   })
  //   .catch((error) => {
  //     dispatch({ type: types.SUBMISSION_FAIL, error });
  //   });
};
