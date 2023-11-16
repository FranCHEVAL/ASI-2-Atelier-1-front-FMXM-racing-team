export const userAuthentication = (userId) => ({
    type: 'USER_AUTHENTICATION',
    payload: userId
  }
);

export const setGameInfos = (gameInfos) => ({
  type: "UPDATE_GAME",
  payload : gameInfos
})

export const userDisconnection = () => ({
  type: 'USER_DISCONNECTION',
  payload: null
})

export const loadCards = (cards) => ({
    type: 'LOAD_CARDS',
    payload: cards,
});

export const selectCardDetail = (card) => ({
  type: 'LOAD_CARD_DETAIL',
  payload: card
})

