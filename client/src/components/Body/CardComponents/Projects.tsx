import React from 'react'; //useEffect, useState
import { Outlet, NavLink } from 'react-router-dom';

import '../../styling/css/Projects.css';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export default function Projects() {
    //TODO: Shard this file and combine with blog for a better object
    return (
        <>
            <Header />
            <div id="Body">
                <div className="btnContainer">
                    <NavLink
                        className="button extra-wide no-deco"
                        to={`/projects/add`}>
                        <button className="btn right-align">
                            Create new Project
                        </button>
                    </NavLink>
                </div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
