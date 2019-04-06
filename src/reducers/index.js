import { errorReducer } from './errorReducer';
import { loadingReducer } from './loadingReducer';
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { selectedPairingReducer } from './selectedPairingReducer';
import { availPairingsReducer } from './availPairingsReducer';

export const rootReducer = combineReducers({
  isLoading: loadingReducer,
  hasError: errorReducer,
  user: userReducer,
  selectedPairing: selectedPairingReducer,
  availPairings: availPairingsReducer
});