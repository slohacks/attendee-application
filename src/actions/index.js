import * as types from './types';
import { firebase, applicationsRef, firestore } from '../config/firebase';

export const signUp = (values, callback) => (dispatch) => {
  dispatch({ type: types.SIGN_UP_ATTEMPT });
  firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          dispatch({ type: types.SIGN_UP_GUCCI, userCredential });
          callback();
        }).catch(error => dispatch({ type: types.SIGN_UP_FAIL, error }));
    }).catch((error) => {
      dispatch({ type: types.SIGN_UP_FAIL, error });
    });
};

export const login = values => (dispatch) => {
  dispatch({ type: types.LOGIN_ATTEMPT });
  firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      const {
        user: { emailVerified, uid },
      } = userCredential;
      if (emailVerified) {
        const docRef = firestore.collection('applications').doc(`${uid}`);
        docRef.get().then((doc) => {
          if (doc.exists) {
            const appData = doc.data();
            if (typeof appData.rsvp === 'undefined' && appData.status === 1) {
              dispatch({ type: types.UPDATE_APPLICATION_TRUE, app: doc.data(), rsvpInv: false });
              dispatch({ type: types.LOGIN_GUCCI, userCredential });
            } else {
              dispatch({ type: types.UPDATE_APPLICATION_TRUE, app: doc.data(), rsvpInv: true });
              dispatch({ type: types.LOGIN_GUCCI, userCredential });
            }
          } else {
            dispatch({ type: types.UPDATE_APPLICATION_FALSE });
            dispatch({ type: types.LOGIN_GUCCI, userCredential });
          }
        }).catch(() => {
          dispatch({ type: types.UPDATE_APPLICATION_FALSE });
          dispatch({ type: types.LOGIN_GUCCI, userCredential });
        });
      } else {
        dispatch({ type: types.LOGIN_FAIL, error: { message: 'Email not verified, please verify your email.' } });
      }
    }).catch((error) => {
      dispatch({ type: types.LOGIN_FAIL, error });
    });
};

export const rsvpResponse = (user, decision, closeModal) => (dispatch) => {
  applicationsRef.doc(user.uid).update({
    rsvp: decision,
  }).then(() => {
    dispatch({ type: types.UPDATE_RSVP, rsvpVal: true });
    closeModal();
  });
};

export const forgotPassword = (values, callback) => (dispatch) => {
  dispatch({ type: types.FORGOT_PASS_ATTEMPT });
  firebase.auth().sendPasswordResetEmail(values.email)
    .then((userCredential) => {
      dispatch({ type: types.FORGOT_PASS_GUCCI, userCredential });
      callback();
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

export const clearResume = () => {
  return {
    type: types.CLEAR_RESUME_ERROR,
  };
};

export const submitApp = (user, form) => (dispatch) => {
  dispatch({ type: types.ATTEMPT_SUBMISSION });
  const newForm = {
    ...form,
    time: firebase.firestore.Timestamp.now(),
    email: firebase.auth().currentUser.email,
  };
  applicationsRef.doc(user.uid).set(newForm).then(() => {
    applicationsRef.doc(user.uid).get().then((doc) => {
      dispatch({ type: types.UPDATE_APPLICATION_TRUE, app: doc.data(), rsvpInv: false });
    });
    dispatch({ type: types.SUBMISSION_GUCCI });
  }).catch((error) => {
    dispatch({ type: types.SUBMISSION_FAIL, error });
  });
};
