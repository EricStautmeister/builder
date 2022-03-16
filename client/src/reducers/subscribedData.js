const ACTIONS = {
    SET_PROJECTS: 'SET_PROJECTS',
    UPDATE_PROJECTS: 'UPDATE_PROJECTS',
    SET_POSTS: 'SET_POSTS',
    UPDATE_POSTS: 'UPDATE_POSTS',
};

//REDUCER
const initialState = {
    projects: [],
    posts: [],
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_PROJECTS:
            state.projects = action.payload.projects;
            return state;

        case ACTIONS.SET_POSTS:
            state.posts = action.payload.posts;
            return state;

        case ACTIONS.UPDATE_PROJECTS:
            state.projects.splice(0, 0, action.payload.projects)
            return state;

        case ACTIONS.UPDATE_POSTS:
            state.posts.splice(0, 0, action.payload.posts)
            return state;

        default:
            return state;
    }
};

export default userReducer;