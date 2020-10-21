import { errorReducer } from './errorReducer';
import { loadingReducer } from './loadingReducer';
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { availPairingsReducer } from './availPairingsReducer';
import { scheduleReducer } from './scheduleReducer';
import { rockandpebbleReducer } from './rockandpebbleReducer';
import { statsReducer } from './statsReducer';
import { availableRocksReducer } from './availableRocksReducer';

export const rootReducer = combineReducers({
  isLoading: loadingReducer,
  hasError: errorReducer,
  user: userReducer,
  availPairings: availPairingsReducer,
  schedule: scheduleReducer,
  rockandpebbles: rockandpebbleReducer,
  stats: statsReducer,
  availableRocks: availableRocksReducer
});
