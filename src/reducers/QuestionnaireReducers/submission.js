import * as types from '../../actions/types';

const INITIAL_STATE = {
  submissionStatus: false,
  loading: false,
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ATTEMPT_SUBMISSION:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case types.SUBMISSION_GUCCI:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        submissionStatus: true,
      };
    case types.SUBMISSION_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
}
