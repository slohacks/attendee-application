import
{
  SIGN_UP,
  LOGIN,
  SAVE_RESPONSE,
  FILE_NAME,
} from './types';

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

export function saveFile(fileName) {
  return {
    type: FILE_NAME,
    payload: fileName,
  };
}
