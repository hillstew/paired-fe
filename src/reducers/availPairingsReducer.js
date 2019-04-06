export const availPairingsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PAIRINGS':
      return action.pairings;
    default:
      return state;
  }
}