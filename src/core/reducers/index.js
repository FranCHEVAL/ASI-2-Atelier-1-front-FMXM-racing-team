import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { cardsReducer } from './cards.reducer';
import { cardDetailReducer } from './cardDetail.reducer';

const globalReducer = combineReducers({
  authReducer: authReducer,
  cardsReducer: cardsReducer,
  cardDetailReducer : cardDetailReducer
});

export default globalReducer;