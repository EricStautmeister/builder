import userReducer from './userReducer';
import loggedReducer from './isLogged';
import subscriptions from './subscriptions';
import csrfReducer from './csrfReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    user: userReducer,
    isLoggedIn: loggedReducer,
    subscriptions: subscriptions,
    CSRFToken: csrfReducer,
});

export default reducers;
