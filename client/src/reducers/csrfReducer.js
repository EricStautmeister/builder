const ACTIONS = {
    SET_TOKEN: 'SET_TOKEN',
};

//REDUCER
const csrfReducer = (state = '', action) => {
    switch (action.type) {
        case ACTIONS.SET_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

export default csrfReducer;
