import * as types from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  user: {},
  error: false,
  errorMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
      return {
        ...state,
        errorMessage: '',
      };
    case types.LOGIN_GUCCI:
      return {
        ...state,
        authenticated: true,
        error: false,
        user: action.userCredential.user,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: action.error.message,
      };
    case types.SIGN_OUT_GUCCI:
      return {
        ...state,
        authenticated: false,
        error: false,
        user: {},
      };
    case types.SIGN_OUT_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
};
