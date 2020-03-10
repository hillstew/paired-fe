export const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SCHEDULE':
      return action.schedule.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    case 'DELETE_PAIRING':
      return state.filter(pairing => {
        return pairing.id !== action.id;
      });
    case 'ADD_TO_SCHEDULE':
      return [...state, action.pairing].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    case 'SIGN_USER_OUT':
      return [];
    default:
      return state;
  }
};
