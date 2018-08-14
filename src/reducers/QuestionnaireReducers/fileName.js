import { FILE_NAME } from '../../actions/types';

const INITIAL_STATE = 'Select File';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FILE_NAME:
      return action.payload;
    default:
      return state;
  }
}
