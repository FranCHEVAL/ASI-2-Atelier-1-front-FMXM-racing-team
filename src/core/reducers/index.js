import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { cardsReducer } from './cards.reducer';
import { cardDetailReducer } from './cardDetail.reducer';
import { usersReducer } from './users.reducer';
import { chatReducer } from './chat.reducer';

const globalReducer = combineReducers({
  authReducer: authReducer,
  cardsReducer: cardsReducer,
  cardDetailReducer : cardDetailReducer,
  usersReducer: usersReducer,
  chatReducer: chatReducer
});

export default globalReducer;