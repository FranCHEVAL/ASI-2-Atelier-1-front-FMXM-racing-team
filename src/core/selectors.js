export const isConnected = (state) => {
    return state.authReducer.currentUserId != null
};
export const getUserId = (state) => {
    return state.authReducer.currentUserId;
};
export const selectCards = (state) => state.cardsReducer.cards;
export const selectCardDetail = (state) => state.cardDetailReducer.card;
export const getUsersList = (state) => state.usersReducer.usersList;
export const getReceiverId = (state) => state.chatReducer.receiverId;
export const getChatHistory = (state) =>  {
    console.log(state.chatReducer.chatHistory)
    return state.chatReducer.chatHistory}
