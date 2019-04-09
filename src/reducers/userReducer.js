export const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user;
    case 'SIGN_USER_OUT':
      return {};
    default:
      return state;
  }
}