import * as types from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  resendLoading: false,
  resendComplete: null,
  success: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.EMAIL_VERIFICATION_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case types.EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    case types.EMAIL_VERIFICATION_FAIL:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    case types.RESEND_EMAIL_VERIFICATION_ATTEMPT:
      return {
        ...state,
        resendLoading: true,
      };
    case types.RESEND_EMAIL_VERIFICATION_COMPLETE:
      return {
        ...state,
        resendLoading: false,
        resendComplete: true,
      };
    default:
      return state;
  }
};
