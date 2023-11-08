export const isConnected = (state) => {
    return state.authReducer.currentUserId != null
};