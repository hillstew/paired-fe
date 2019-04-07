export const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SCHEDULE':
      return action.schedule;
    default:
      return state;
  }
};
