import React from 'react'; //useEffect, useState
import { Outlet, NavLink } from 'react-router-dom';

import '../../styling/css/Projects.css';

export default function Projects({ CSRFToken }) {
    return (
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
    );
}
