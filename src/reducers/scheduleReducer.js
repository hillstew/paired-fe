export const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SCHEDULE':
      return action.schedule.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
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
