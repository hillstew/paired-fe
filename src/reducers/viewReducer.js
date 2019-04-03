export const viewReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return action.view;
    default:
      return state;
  }
};
