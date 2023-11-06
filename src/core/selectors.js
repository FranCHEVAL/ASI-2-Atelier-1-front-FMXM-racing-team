export const isConnected = (state) => {
    return state.authReducer.currentUserId != null
};
export const selectCards = (state) => state.cardsReducer.cards;
export const selectCardDetail = (state) => state.cardDetailReducer.card;
