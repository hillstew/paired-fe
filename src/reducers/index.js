import { errorReducer } from './errorReducer';
import { loadingReducer } from './loadingReducer';
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { selectedPairingReducer } from './selectedPairingReducer';
import { availPairingsReducer } from './availPairingsReducer';
import { scheduleReducer } from './scheduleReducer';

export const rootReducer = combineReducers({
  isLoading: loadingReducer,
  hasError: errorReducer,
  user: userReducer,
  selectedPairing: selectedPairingReducer,
  availPairings: availPairingsReducer,
  schedule: scheduleReducer
});
