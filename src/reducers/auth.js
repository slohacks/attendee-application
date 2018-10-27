const INITIAL_STATE = {
  authenticated: 'true',
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
