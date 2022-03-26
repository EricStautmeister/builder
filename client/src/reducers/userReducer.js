const ACTIONS = {
    SET_USER: 'SET_USER',
    SET_DISPLAY_NAME: 'SET_DISPLAY_NAME',
    SET_EMAIL: 'SET_EMAIL',
    SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',
};
//TODO: Implement UID Action
//REDUCER
const initialState = {
    displayName: null,
    email: null,
    phoneNumber: null,
    uid: null,
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_USER:
            return {
                displayName: action.payload.displayName,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                uid: action.payload.uid,
            };

        case ACTIONS.SET_DISPLAY_NAME:
            state.displayName = action.payload.displayName;
            return state;

        case ACTIONS.SET_EMAIL:
            state.email = action.payload.displayName;
            return state;

        case ACTIONS.SET_PHONE_NUMBER:
            state.phoneNumber = action.payload.phoneNumber;
            return state;

        default:
            return state;
    }
};
export default userReducer;
