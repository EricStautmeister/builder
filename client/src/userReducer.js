const initialState = {
    email: null,
    displayName: null,
    phoneNumber: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALISE_USER': {
            return { theme: action.theme };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
