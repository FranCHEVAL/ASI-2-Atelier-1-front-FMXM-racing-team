const initialState = {
    currentUserId:null
};
  
  
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_AUTHENTICATION':
        return {
          ...state,
          currentUserId: action.payload,
        };
      case 'USER_DISCONNECTION':
        return{
          ...state,
          currentUserId:null,
        }
      default:
        return state;
    }
};