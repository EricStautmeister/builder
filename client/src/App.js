import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fire';

import { ProjectList, PostList, NewItem, FullPage } from './components'; //Card
import {
    Header,
    Footer,
    Home,
    Dashboard,
    Projects,
    Blog,
    Login,
    SignUp,
    Profile,
    Preferences,
    Integrations,
    Settings,
} from './components';

import './components/css/normalise.css';
import './components/css/index.css';

//TODO: needs theme color changer and shit

function App() {
    const [CSRFToken, setCSRFToken] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });

    return (
        <Router>
            {isLoggedIn ? (
                <>
                    <Header isLoggedIn={isLoggedIn} />
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
                            element={<Profile CSRFToken={CSRFToken} user={user} />}
                        />
                        <Route
                            path="/preferences"
                            element={<Preferences CSRFToken={CSRFToken} user={user} />}
                        />
                        <Route
                            path="/integrations"
                            element={<Integrations CSRFToken={CSRFToken} user={user} />}
                        />
                        <Route
                            path="/settings"
                            element={<Settings CSRFToken={CSRFToken} user={user} />}
                        />
                        <Route
                            path="/*"
                            element={
                                <Dashboard
                                    CSRFToken={CSRFToken}
                                    setUser={setUser}
                                />
                            }
                        />
                    </Routes>
                    <Footer />
                </>
            ) : (
                <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Routes>
                        <Route
                            path="/"
                            element={<Home CSRFToken={CSRFToken} />}
                        />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    CSRFToken={CSRFToken}
                                    setUser={setUser}
                                />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <SignUp
                                    CSRFToken={CSRFToken}
                                    setUser={setUser}
                                />
                            }
                        />
                        <Route
                            path="/*"
                            element={
                                <Login
                                    CSRFToken={CSRFToken}
                                    setUser={setUser}
                                />
                            }
                        />
                    </Routes>
                    <Footer />
                </>
            )}
        </Router>
    );
}

export default React.memo(App);