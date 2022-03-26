import userReducer from './userReducer';
import loggedReducer from './isLogged';
import subscribedData from './subscribedData';
import csrfReducer from './csrfReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    user: userReducer,
    isLoggedIn: loggedReducer,
    subscriptions: subscribedData,
    CSRFToken: csrfReducer,
});

export default reducers;
