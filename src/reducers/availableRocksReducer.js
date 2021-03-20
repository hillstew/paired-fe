export const availableRocksReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_AVAILABLE_ROCKS':
      return action.rocks;
    default:
      return state;
  }
}