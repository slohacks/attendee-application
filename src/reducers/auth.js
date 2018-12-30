import * as types from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  user: {},
  error: false,
  errorMessage: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
      return {
        ...state,
        error: false,
        errorMessage: '',
        loading: true,
      };
    case types.LOGIN_GUCCI:
      return {
        ...state,
        authenticated: true,
        error: false,
        user: action.userCredential.user,
        loading: false,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: action.error.message,
        loading: false,
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
