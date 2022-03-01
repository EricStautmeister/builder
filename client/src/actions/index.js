//ACTIONS
const ACTIONS = {
    SET_USER: 'SET_USER',
    SET_DISPLAY_NAME: 'SET_DISPLAY_NAME',
    SET_EMAIL: 'SET_EMAIL',
    SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',
};
export const setUser = (payload) => {
    return {
        type: ACTIONS.SET_USER,
        payload 
    };
};
export const setDisplayName = (payload) => {
    return {
        type: ACTIONS.SET_DISPLAY_NAME,
        payload
    };
};
export const setEmail = (payload) => {
    return {
        type: ACTIONS.SET_EMAIL,
        payload
    };
};
export const setPhoneNumber = (payload) => {
    return {
        type: ACTIONS.SET_PHONE_NUMBER,
        payload
    };
};

export const setLoggedIn = () => {
    return {
        type: 'LOGIN'
    }
}

export const setLoggedOut = () => {
    return {
        type: 'LOGOUT'
    }
}
