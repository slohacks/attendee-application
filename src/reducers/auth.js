import * as types from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  user: null,
  token: null,
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
        loading: false,
        user: action.userCredential,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case types.SIGN_OUT_GUCCI:
      return {
        ...state,
        authenticated: false,
        error: false,
        user: null,
      };
    case types.SIGN_OUT_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
