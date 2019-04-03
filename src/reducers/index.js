import { viewReducer } from './viewReducer';
import { errorReducer } from './errorReducer';
import { loadingReducer } from './loadingReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  isLoading: loadingReducer,
  view: viewReducer,
  hasError: errorReducer
});
