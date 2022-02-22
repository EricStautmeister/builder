import React from 'react'; //useEffect, useState
import { Outlet, NavLink } from 'react-router-dom';

import './css/Projects.css';

export default function Projects({ JWT }) {
    //TODO: Add a delete and edit btn
    //TODO: Document crud only if you are admin
    return (
        <div id="Body">
            <div className="btnContainer">
                <NavLink className="no-deco" to={`/projects/add`}>
                    <button className="btn right-align">
                        Create new Project
                    </button>
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
}
