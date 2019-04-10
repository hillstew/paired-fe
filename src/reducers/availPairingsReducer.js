export const availPairingsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PAIRINGS':
      return action.pairings;
    case 'SIGN_USER_OUT':
      return [];
    default:
      return state;
  }
}