import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fire';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setLoggedOut } from './actions';
import { Jelly } from '@uiball/loaders';

import './components/styling/css/normalise.css';
import './components/styling/css/index.css';

const LoggedIn = React.lazy(() => import('./application-states/LoggedIn'));
const NotLoggedIn = React.lazy(() => import('./application-states/NotLoggedIn'));

function App() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();

    onAuthStateChanged(auth, (user) => {
        return user ? dispatch(setLoggedIn()) : dispatch(setLoggedOut());
    });

    return (
        <React.Suspense fallback={<Jelly size={80} speed={0.9} color="black" />}>
            <Router>{isLoggedIn ? <LoggedIn /> : <NotLoggedIn />}</Router>
        </React.Suspense>
    );
}

export default React.memo(App);
