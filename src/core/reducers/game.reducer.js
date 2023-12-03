const initialState = {
  gameInfos:[]
};
  
  
export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_GAME':
        return {
          ...state,
          gameInfos: action.payload,
        };
      
      default:
        return state;
    }
};