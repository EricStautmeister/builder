type ActionType = {
    type: string;
};

const loggedReducer = (state = false, { type }: ActionType) => {
    switch (type) {
        case 'LOGIN':
            return true;
        case 'LOGOUT':
            return false;
        default:
            return state;
    }
};

export default loggedReducer;
