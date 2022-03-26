import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fire';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setLoggedOut, setCSRFToken } from './actions';
import { LoggedIn, NotLoggedIn } from './application-states';
// import SubdomainHandler from './SubdomainHandler';
import './components/styling/css/normalise.css';
import './components/styling/css/index.css';

function App() {
    //TODO: Implement Subdomain dependant routing
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const CSRFToken = useSelector((state) => state.CSRFToken);
    const dispatch = useDispatch();

    const getCSRFToken = async (httpAnchor) => {
        const serverUrl = 'http://localhost:5000';
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                mode: 'cors',
            },
            mode: 'cors',
            credentials: 'include',
        };
        const response = await fetch(
            `${serverUrl}${httpAnchor}`,
            requestOptions
        );
        const data = await response.json();
        dispatch(setCSRFToken(data.csrfToken));
    };

    useEffect(() => {
        getCSRFToken('/process');
    }, []);

    onAuthStateChanged(auth, (user) => {
        return user ? dispatch(setLoggedIn()) : dispatch(setLoggedOut());
    });

    return (
        <Router>
            {isLoggedIn ? (
                <LoggedIn/>
            ) : (
                <NotLoggedIn/>
            )}
        </Router>
    );
}

export default React.memo(App);
