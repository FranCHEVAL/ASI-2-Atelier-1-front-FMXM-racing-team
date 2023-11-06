const initialState = {
    cards: [],
  };
  
  export const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_CARDS':
        return {
          ...state,
          cards: action.payload,
        };
      default:
        return state;
    }
  };
  