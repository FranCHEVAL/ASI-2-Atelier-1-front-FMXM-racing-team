const initialState = {
    chatHistory: [],
    receiverId: null
};
  
export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RECEIVER_ID':
            return {
                ...state,
                receiverId: action.payload,
            };
        case 'LOAD_CHAT_HISTORY':
            return {
                ...state,
                chatHistory: action.payload
            }
        case 'UPDATE_CHAT_HISTORY':
            return {
                ...state,
                chatHistory: [...state.chatHistory, action.payload]
            }
        default:
            return state;
    }
};
