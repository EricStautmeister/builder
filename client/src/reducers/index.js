import userReducer from './userReducer';
import loggedReducer from './isLogged';
import subscribedData from './subscribedData';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    user: userReducer,
    isLoggedIn: loggedReducer,
    subscriptions: subscribedData,
});

export default reducers;
