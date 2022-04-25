const ACTIONS = {
    SET_USER: 'SET_USER',
    SET_DISPLAY_NAME: 'SET_DISPLAY_NAME',
    SET_EMAIL: 'SET_EMAIL',
    SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',
    SET_UID: 'SET_UID',
};
type ActionType = {
    type: string;
    payload: any;
};
//REDUCER
const initialState = {
    displayName: null,
    email: null,
    phoneNumber: null,
    uid: null,
};

const userReducer = (state = initialState, { type, payload }: ActionType) => {
    switch (type) {
        case ACTIONS.SET_USER:
            return {
                displayName: payload.displayName,
                email: payload.email,
                phoneNumber: payload.phoneNumber,
                uid: payload.uid,
            };

        case ACTIONS.SET_DISPLAY_NAME:
            state.displayName = payload.displayName;
            return state;

        case ACTIONS.SET_EMAIL:
            state.email = payload.displayName;
            return state;

        case ACTIONS.SET_PHONE_NUMBER:
            state.phoneNumber = payload.phoneNumber;
            return state;

        case ACTIONS.SET_UID:
            state.uid = payload.uid;
            return state;

        default:
            return state;
    }
};
export default userReducer;
