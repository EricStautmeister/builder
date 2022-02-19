// @flow

import React, { Component } from 'react'; //useEffect, useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PostList, NewItem, FullPage } from './components'; //Card
import {
    Header,
    Footer,
    Home,
    Projects,
    ProjectList,
    Blog,
    Login,
    SignUp,
} from './components';

import './components/css/normalise.css';
import './components/css/index.css';

//TODO: Rename project to portfolio builder (comes with appropriate changes)
//TODO: needs theme color changer and shit

//TODO: Post component should be replaced with FullPage
export default class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />}>
                        <Route path="" element={<ProjectList />} />
                        <Route path="add" element={<NewItem url={'/uploadProject'} />} />
                        <Route path=":id" element={<FullPage />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/posts" element={<Blog />}>
                        <Route path="" element={<PostList />} />
                        <Route path="add" element={<NewItem url={'/uploadPost'} />} />
                        {/* <Route path="add" element={<NewPost />} /> */}
                        <Route path=":id" element={<FullPage />} />
                    </Route>
                </Routes>
                <Footer />
            </Router>
        );
    }
}
