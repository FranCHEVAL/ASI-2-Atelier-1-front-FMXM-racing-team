const initialState = {
    isAuthenticate: false
  };
  
  
export const setAuthenticated = (state = initialState, action) => {
    return {
      ...state,
      isAuthenticate: action.payload,
    };
  };