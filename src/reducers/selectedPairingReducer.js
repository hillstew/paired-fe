export const selectedPairingReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ID':
      return action.id;
    case 'SIGN_USER_OUT':
      return '';
    default:
      return state;
  }
}