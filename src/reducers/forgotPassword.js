import * as types from '../actions/types';

const INITIAL_STATE = {
  error: false,
  errorMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FORGOT_PASS_ATTEMPT:
      return {
        ...state,
        errorMessage: '',
      };
    case types.FORGOT_PASS_FAIL:
      console.log(action.error);
      return {
        ...state,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
};
