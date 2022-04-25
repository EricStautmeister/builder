import React from 'react'; //useEffect, useState
import { Outlet, NavLink } from 'react-router-dom';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

import '../../styling/css/Blog.css';

export default function Blog() {
    return (
        <>
            <Header />
            <main>
                <div id="Body">
                    <div className="btnContainer">
                        <NavLink
                            className="button extra-wide no-deco"
                            to={`/posts/add`}>
                            <button className="btn right-align">
                                Create new Post
                            </button>
                        </NavLink>
                    </div>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
}
