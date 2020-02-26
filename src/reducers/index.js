import { errorReducer } from './errorReducer';
import { loadingReducer } from './loadingReducer';
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { availPairingsReducer } from './availPairingsReducer';
import { scheduleReducer } from './scheduleReducer';
import { statsReducer } from './statsReducer';

export const rootReducer = combineReducers({
  isLoading: loadingReducer,
  hasError: errorReducer,
  user: userReducer,
  availPairings: availPairingsReducer,
  schedule: scheduleReducer,
  stats: statsReducer
});
