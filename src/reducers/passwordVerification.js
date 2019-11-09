import * as types from '../actions/types';

const INITIAL_STATE = {
  verifyLoading: false,
  verifySuccess: null,
  confirmLoading: false,
  confirmSuccess: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PASSWORD_VERIFICATION_ATTEMPT:
      return {
        ...state,
        verifyLoading: true,
      };
    case types.PASSWORD_VERIFICATION_COMPLETE:
      return {
        ...state,
        verifyLoading: false,
        verifySuccess: action.payload.success,
      };
    case types.PASSWORD_CONFIRM_ATTEMPT:
      return {
        ...state,
        confirmLoading: true,
      };
    case types.PASSWORD_CONFIRM_COMPLETE:
      return {
        ...state,
        confirmLoading: false,
        confirmSuccess: action.payload.success,
      };
    default:
      return state;
  }
};
