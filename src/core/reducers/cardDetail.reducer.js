const initialState = {
    card: null,
  };
  
export const cardDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CARD_DETAIL':
            return {
                ...state,
                card: action.payload,
            };
        default:
            return state;
    }
};
