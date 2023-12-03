export const isConnected = (state) => {
    return state.authReducer.currentUserId != null
};
export const getUserId = (state) => {
    return state.authReducer.currentUserId;
};
export const selectCards = (state) => state.cardsReducer.cards;
export const getUsersList = (state) => state.usersReducer.usersList;
export const getReceiverId = (state) => state.chatReducer.receiverId;
export const getChatHistory = (state) =>  {
    console.log(state.chatReducer.chatHistory)
    return state.chatReducer.chatHistory}
export const selectCardDetail = (state) => state !== null ? state.cardDetailReducer.card : null;

export const selectGameInfos = (state) => state.gameReducer.gameInfos;
