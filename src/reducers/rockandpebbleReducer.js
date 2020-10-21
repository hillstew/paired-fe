export const rockandpebbleReducer = (state = {}, action) => {
    switch(action.type) {
      case 'SET_ROCK_AND_PEBBLE':
        return action.rock_and_pebble;
      default:
        return state;
    }
  }