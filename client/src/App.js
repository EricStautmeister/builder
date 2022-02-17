// @flow

import React, { Component } from 'react'; //useEffect, useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Post, Posts, NewPost, NewProject, FullPage } from './components'; //Card
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
                        <Route path="add" element={<NewProject />} />
                        <Route path=":id" element={<FullPage />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/blog" element={<Blog />}>
                        <Route path="" element={<Posts />} />
                        <Route path="new" element={<NewPost />} />
                        <Route path="i?postSlug" element={<Post />} />
                    </Route>
                </Routes>
                <Footer />
            </Router>
        );
    }
}
