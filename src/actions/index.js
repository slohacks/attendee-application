export const SIGN_UP = 'sign_up';

export function signUp(values) {
  return {
    type: SIGN_UP,
    payload: values,
  };
}
export const LOGIN = 'login';

export function login(values) {
  return {
    type: LOGIN,
    payload: values,
  };
}
