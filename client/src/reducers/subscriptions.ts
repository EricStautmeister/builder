const ACTIONS = {
    SET_PROJECTS: 'SET_PROJECTS',
    UPDATE_PROJECTS: 'UPDATE_PROJECTS',
    SET_POSTS: 'SET_POSTS',
    UPDATE_POSTS: 'UPDATE_POSTS',
};

type ActionType = {
    type: string;
    payload: any;
};

type StateType = {
    projects: Array<any>;
    posts: Array<any>;
};

//REDUCER
const initialState: StateType = {
    projects: [],
    posts: [],
};
const subscriptions = (state: StateType = initialState, { type, payload }: ActionType) => {
    switch (type) {
        case ACTIONS.SET_PROJECTS:
            state.projects = payload.projects;
            return state;

        case ACTIONS.SET_POSTS:
            state.posts = payload.posts;
            return state;

        case ACTIONS.UPDATE_PROJECTS:
            state.projects.splice(0, 0, payload.projects);
            return state;

        case ACTIONS.UPDATE_POSTS:
            state.posts.splice(0, 0, payload.posts);
            return state;

        default:
            return state;
    }
};

export default subscriptions;
