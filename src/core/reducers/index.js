import { combineReducers } from 'redux';
import { setAuthenticated } from './auth.reducer';

const globalReducer = combineReducers({
  authReducer: setAuthenticated
});

export default globalReducer;