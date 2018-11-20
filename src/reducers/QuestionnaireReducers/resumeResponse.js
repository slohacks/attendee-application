import * as types from '../../actions/types';

const INITIAL_STATE = {
  fileName: 'UPLOAD',
  loading: false,
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPLOAD_RESUME_ATTEMPT:
      return { ...state, loading: true, errorMessage: '' };
    case types.UPLOAD_RESUME_GUCCI:
      return { ...state, loading: false, fileName: action.resume.name };
    case types.UPLOAD_RESUME_FAIL:
      return { ...state, loading: false, errorMessage: action.error };
    default:
      return state;
  }
}
