import React, { Component } from 'react'; //useEffect, useState
import { Outlet, NavLink } from 'react-router-dom';

import './css/Projects.css';

export default class Projects extends Component {
    render() {
        //TODO: Add a delete and edit btn
        //TODO: Document crud only if you are admin
        return (
            <div id="Body">
                <div className="btnContainer">
                    <NavLink className="no-deco" to={`/projects/add`}>
                        <button className="btn right-align">Add</button>
                    </NavLink>
                </div>
                <Outlet />
            </div>
        );
    }
}
