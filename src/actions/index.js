import
{
  SIGN_UP,
  LOGIN,
  SAVE_RESPONSE,
  FILE_NAME,
  HANDLE_AUTHENTICATION,
} from './types';
import firebase from 'firebase';
import database from '../config/firebase';

export function signUp(values) {
  return {
    type: SIGN_UP,
    payload: values,
  };
}

export function login(values) {
  return {
    type: LOGIN,
    payload: values,
  };
}

export function submitResponse(formProps) {
  return {
    type: SAVE_RESPONSE,
    payload: formProps,
  };
}

export function submitApp(form) {
  return (dispatch) => {
    database.ref().push(form);
  }
}

export function saveFile(fileName) {
  return {
    type: FILE_NAME,
    payload: fileName,
  };
}

export function handleAuth(tokens, callback) {
  return (dispatch) => {
    const expiresAt = JSON.stringify((tokens.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('id_token', tokens.idToken);
    localStorage.setItem('expires_at', expiresAt);
    dispatch({ type: HANDLE_AUTHENTICATION, payload: tokens });
    callback();
  };
}
