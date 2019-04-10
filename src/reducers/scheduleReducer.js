export const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SCHEDULE':
      return action.schedule;
    case 'DELETE_PAIRING':
      return state.filter(booking => {
        return booking.id !== action.id;
      });
    case 'ADD_TO_SCHEDULE':
      return [...state, action.pairing];
    case 'SIGN_USER_OUT':
      return [];
    default:
      return state;
  }
};
