const ACTIONS = {
    SET_TOKEN: 'SET_TOKEN',
};

type ActionType = {
    type: string,
    payload: any,
};

//REDUCER
const csrfReducer = (state = '', {type, payload}: ActionType) => {
    switch (type) {
        case ACTIONS.SET_TOKEN:
            return payload;
        default:
            return state;
    }
};

export default csrfReducer;
