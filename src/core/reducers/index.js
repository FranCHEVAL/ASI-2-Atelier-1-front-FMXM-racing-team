import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { cardsReducer } from './cards.reducer';
import { cardDetailReducer } from './cardDetail.reducer';
import { gameReducer } from './game.reducer';

const globalReducer = combineReducers({
  authReducer: authReducer,
  cardsReducer: cardsReducer,
  cardDetailReducer : cardDetailReducer,
  gameReducer : gameReducer
});

export default globalReducer;