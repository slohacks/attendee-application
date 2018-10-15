import { HANDLE_AUTHENTICATION } from '../actions/types';

const INITIAL_STATE = {
  accessToken: '',
  userToken: '',
  expiresAt: '',
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case HANDLE_AUTHENTICATION: {
      const tokenExpiration = JSON.stringify((action.payload.expiresIn * 1000) + new Date().getTime()); // eslint-disable-line max-len
      console.log(action.payload);

      return {
        ...state,
        accessToken: action.payload.accessToken,
        userToken: action.payload.idToken,
        expiresAt: tokenExpiration,
      };
    }

    default:
      return state;
  }
}
