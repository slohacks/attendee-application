import { SAVE_RESPONSE } from '../../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_RESPONSE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
