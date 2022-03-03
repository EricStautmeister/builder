import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fire';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setLoggedOut } from './actions'; //setUser
import { Header } from './components/Header';
import {
    Blog,
    Dashboard,
    Home,
    Integrations,
    Login,
    PostList,
    Preferences,
    Profile,
    ProjectList,
    Projects,
    Settings,
    SignUp,
    FullPage,
    NewItem,
} from './components/Body';
import { Footer } from './components/Footer';
import './components/styling/css/normalise.css';
import './components/styling/css/index.css';

function App() {
    const [CSRFToken, setCSRFToken] = useState('');

    let dispatch = useDispatch();
    // const user = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

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
        setCSRFToken(data.csrfToken);
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
                <>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={<Dashboard CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/projects"
                            element={<Projects CSRFToken={CSRFToken} />}>
                            <Route
                                path=""
                                element={<ProjectList CSRFToken={CSRFToken} />}
                            />
                            <Route
                                path="add"
                                element={
                                    <NewItem
                                        url={'/uploadProject'}
                                        CSRFToken={CSRFToken}
                                    />
                                }
                            />
                            <Route
                                path=":id"
                                element={<FullPage CSRFToken={CSRFToken} />}
                            />
                        </Route>
                        <Route
                            path="/posts"
                            element={<Blog CSRFToken={CSRFToken} />}>
                            <Route
                                path=""
                                element={<PostList CSRFToken={CSRFToken} />}
                            />
                            <Route
                                path="add"
                                element={
                                    <NewItem
                                        url={'/uploadPost'}
                                        CSRFToken={CSRFToken}
                                    />
                                }
                            />
                            <Route
                                path=":id"
                                element={<FullPage CSRFToken={CSRFToken} />}
                            />
                        </Route>
                        <Route
                            path="/profile"
                            element={<Profile CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/preferences"
                            element={<Preferences CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/integrations"
                            element={<Integrations CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/settings"
                            element={<Settings CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/*"
                            element={<Dashboard CSRFToken={CSRFToken} />}
                        />
                    </Routes>
                    <Footer />
                </>
            ) : (
                <>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={<Home CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/login"
                            element={<Login CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/signup"
                            element={<SignUp CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/*"
                            element={<Login CSRFToken={CSRFToken} />}
                        />
                    </Routes>
                    <Footer />
                </>
            )}
        </Router>
    );
}

export default React.memo(App);
