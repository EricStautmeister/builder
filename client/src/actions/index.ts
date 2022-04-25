//ACTIONS
const ACTIONS = {
    /* USER REDUCER */
    SET_USER: 'SET_USER',
    SET_DISPLAY_NAME: 'SET_DISPLAY_NAME',
    SET_EMAIL: 'SET_EMAIL',
    SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',

    /* SUBSCRIPTION REDUCER */
    SET_PROJECTS: 'SET_PROJECTS',
    UPDATE_PROJECTS: 'UPDATE_PROJECTS',
    SET_POSTS: 'SET_POSTS',
    UPDATE_POSTS: 'UPDATE_POSTS',

    /* TOKEN REDUCER */
    SET_TOKEN: 'SET_TOKEN',
};

export const setProjects = (payload: any) => {
    return {
        type: ACTIONS.SET_PROJECTS,
        payload,
    };
};

export const setPosts = (payload: any) => {
    return {
        type: ACTIONS.SET_POSTS,
        payload,
    };
};

export const updateProjects = (payload: any) => {
    return {
        type: ACTIONS.UPDATE_PROJECTS,
        payload,
    };
};

export const updatePosts = (payload: any) => {
    return {
        type: ACTIONS.UPDATE_POSTS,
        payload,
    };
};

export const setUser = (payload: any) => {
    return {
        type: ACTIONS.SET_USER,
        payload,
    };
};
export const setDisplayName = (payload: any) => {
    return {
        type: ACTIONS.SET_DISPLAY_NAME,
        payload,
    };
};
export const setEmail = (payload: any) => {
    return {
        type: ACTIONS.SET_EMAIL,
        payload,
    };
};
export const setPhoneNumber = (payload: any) => {
    return {
        type: ACTIONS.SET_PHONE_NUMBER,
        payload,
    };
};

export const setCSRFToken = (payload: any) => {
    return {
        type: ACTIONS.SET_TOKEN,
        payload,
    };
};

export const setLoggedIn = () => {
    return {
        type: 'LOGIN',
    };
};

export const setLoggedOut = () => {
    return {
        type: 'LOGOUT',
    };
};
