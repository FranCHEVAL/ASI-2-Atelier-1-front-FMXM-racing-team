import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';

const globalReducer = combineReducers({
  authReducer: authReducer
});

export default globalReducer;