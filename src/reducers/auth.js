import * as types from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  user: {},
  completedApplication: false,
  error: false,
  errorMessage: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_APPLICATION_TRUE:
      return {
        ...state,
        completedApplication: true,
      };
    case types.UPDATE_APPLICATION_FALSE:
      return {
        ...state,
        completedApplication: false,
      };
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
