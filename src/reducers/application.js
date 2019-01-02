import * as types from '../actions/types';

const INITIAL_STATE = {
  completedApplication: false,
  application: null,
  rsvp: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_APPLICATION_TRUE:
      return {
        ...state,
        completedApplication: true,
        application: action.app,
        rsvp: action.rsvpInv,
      };
    case types.UPDATE_APPLICATION_FALSE:
      return {
        ...state,
        completedApplication: false,
        application: null,
        rsvp: null,
      };
    case types.UPDATE_RSVP:
      return {
        ...state,
        rsvp: action.rsvpVal,
      };
    default:
      return state;
  }
};
