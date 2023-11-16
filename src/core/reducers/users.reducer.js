const initialState = {
    usersList:[]
};
  
  
export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_USERS':
        return {
          ...state,
          usersList: action.payload,
        };
      default:
        return state;
    }
};