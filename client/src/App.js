// @flow

import React, { useState } from 'react'; //useEffect, useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
} from './components';

import './components/css/normalise.css';
import './components/css/index.css';

//TODO: needs theme color changer and shit

export default function App() {
    const [JWT, setJWT] = useState();
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />}>
                    <Route path="" element={<ProjectList />} />
                    <Route
                        path="add"
                        element={<NewItem url={'/uploadProject'} />}
                    />
                    <Route path=":id" element={<FullPage />} />
                </Route>
                <Route path="/login" element={<Login setJWT={setJWT} />} />
                <Route path="/signup" element={<SignUp setJWT={setJWT} />} />
                <Route path="/posts" element={<Blog />}>
                    <Route path="" element={<PostList />} />
                    <Route
                        path="add"
                        element={<NewItem url={'/uploadPost'} />}
                    />
                    <Route path=":id" element={<FullPage />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}
