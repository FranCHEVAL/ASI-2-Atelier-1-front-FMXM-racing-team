import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';

const globalReducer = combineReducers({
  authReducer: authReducer,
  cardsReducer: cardsReducer

});

export default globalReducer;