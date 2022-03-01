import userReducer from './userReducer';
import loggedReducer from './isLogged';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    user: userReducer,
    isLoggedIn: loggedReducer,
});

export default reducers;
