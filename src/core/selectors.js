export const isConnected = (state) => {
    return state.authReducer.currentUserId != null
};
export const selectCards = (state) => state.cardsReducer.cards;
