import * as types from '../../actions/types';

const INITIAL_STATE = 'Select File';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPLOAD_RESUME_GUCCI:
      return action.resume.name;
    default:
      return state;
  }
}
