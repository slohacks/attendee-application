export const SIGN_UP = 'sign_up';

export function signUp(values) {
  return {
    type: SIGN_UP,
    payload: values,
  };
}
