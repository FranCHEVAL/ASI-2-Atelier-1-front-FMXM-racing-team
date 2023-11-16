export const isConnected = (state) => {
    return state.authReducer.currentUserId != null
};
export const getUserId = (state) => {
    return state.authReducer.currentUserId;
};
export const selectCards = (state) => state.cardsReducer.cards;
export const selectCardDetail = (state) => state !== null ? state.cardDetailReducer.card : null;

export const selectGameInfos = (state) => state.gameReducer.gameInfos;
