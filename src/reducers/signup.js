import * as types from '../actions/types';

const INITIAL_STATE = {
  error: false,
  errorMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGN_UP_ATTEMPT:
      return {
        ...state,
        errorMessage: '',
      };
    case types.SIGN_UP_FAIL:
      return {
        ...state,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
};
