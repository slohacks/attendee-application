import axios from "axios";
import * as types from "./types";

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

export const rsvpResponse = () => dispatch => {
    dispatch({ type: types.UPDATE_RSVP, rsvpVal: true });
};

export const forgotPassword = values => dispatch => {
  dispatch({ type: types.FORGOT_PASS_ATTEMPT });
  axios
    .post(`${API_PATH}/forgot-password/request`, {
      email: values.email
    })
    .then(response => {
      const { success } = response.data;
      if (success === true) {
        dispatch({ type: types.FORGOT_PASS_GUCCI });
      }
    })
    .catch(error => {
      const { errorMessage } = error.response.data;
      dispatch({ type: types.FORGOT_PASS_FAIL, errorMessage });
    });
};

export const signout = () => dispatch => {
  dispatch({ type: types.SIGN_OUT_GUCCI });
};

export function submitResponse(formProps) {
  return {
    type: types.SAVE_RESPONSE,
    payload: formProps
  };
}

export const uploadResume = (user, resume, onChange) => dispatch => {
  dispatch({ type: types.UPLOAD_RESUME_ATTEMPT });
  const data = new FormData();
  data.append("resume", resume);

  axios
    .post(`${API_PATH}/resumes`, data, {
      headers: {
        Authorization: user.token
      }
    })
    .then(() => {
      dispatch({ type: types.UPLOAD_RESUME_GUCCI, resume });
      onChange(resume.name);
    })
    .catch(error => {
      const { errorMessage } = error.response.data;
      dispatch({
        type: types.UPLOAD_RESUME_FAIL,
        error: errorMessage
      });
    });
};

export const clearResume = () => {
  return {
    type: types.CLEAR_RESUME_ERROR
  };
};

export const submitApp = (user, form) => dispatch => {
  const formCopy = form;
  dispatch({ type: types.ATTEMPT_SUBMISSION });
  axios
    .post(`${API_PATH}/applications`, formCopy, {
      headers: {
        Authorization: user.token
      }
    })
    .then(response => {
      dispatch({
        type: types.UPDATE_APPLICATION_TRUE,
        app: response.data,
        rsvpInv: false
      });
      dispatch({ type: types.SUBMISSION_GUCCI });
    })
    .catch(error => {
      const { errorMessage } = error.response.data;
      dispatch({
        type: types.SUBMISSION_FAIL,
        error: errorMessage
      });
    });
};
