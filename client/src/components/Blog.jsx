import React, { Component } from 'react'; //useEffect, useState
import {
    Outlet,
    NavLink,
} from 'react-router-dom';

import './components/css/normalise.css';
import './components/css/index.css';
import './components/css/Blog.css';

export default class Blog extends Component {
    render() {
        return (
            <div id="Body">
                <div className="btnContainer">
                    <NavLink className="no-deco" to={`/blog/new`}>
                        <button className="btn right-align">
                            Create new Post
                        </button>
                    </NavLink>
                </div>
                <Outlet />
            </div>
        );
    }
}
