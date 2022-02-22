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
    const [JWT, setJWT] = useState(); //TODO: Does JWT hold a value after login
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects JWT={JWT} />}>
                    <Route path="" element={<ProjectList JWT={JWT} />} />
                    <Route
                        path="add"
                        element={<NewItem url={'/uploadProject'} JWT={JWT} />}
                    />
                    <Route path=":id" element={<FullPage />} />
                </Route>
                <Route path="/login" element={<Login setJWT={setJWT}  JWT={JWT} />} />
                <Route path="/signup" element={<SignUp setJWT={setJWT}  JWT={JWT} />} />
                <Route path="/posts" element={<Blog JWT={JWT}/>}>
                    <Route path="" element={<PostList />} JWT={JWT} />
                    <Route
                        path="add"
                        element={<NewItem url={'/uploadPost'} JWT={JWT} />}
                    />
                    <Route path=":id" element={<FullPage />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}
