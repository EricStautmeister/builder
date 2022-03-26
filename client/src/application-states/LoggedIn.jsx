import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/Header';
import {
    Blog,
    Dashboard,
    Integrations,
    PostList,
    Preferences,
    Profile,
    ProjectList,
    Projects,
    Settings,
    FullPage,
    NewItem,
    Homepage,
} from '../components/Body';
import { Footer } from '../components/Footer';

function LoggedIn({ CSRFToken }) {
    //TODO: needs own subdomain [[ADMIN]]
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Dashboard CSRFToken={CSRFToken} />}
                    />
                    <Route
                        path="/homepage"
                        element={<Homepage CSRFToken={CSRFToken} />}
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
            </main>
            <Footer />
        </>
    );
}

export default React.memo(LoggedIn);
