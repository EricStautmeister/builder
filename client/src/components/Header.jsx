import React, { Component } from 'react'; //useEffect, useState
import { NavLink } from 'react-router-dom';

import './css/Header.css';

import LogoIcon from './media/logo.png';
import { ReactComponent as MenuIcon } from './media/menu.svg';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLogedIn: false,
        };
    }

    guardClauseExample = () => {
        if (this.state.user == null) return;

        console.log('Legendary Guard Clause');
    };

    render() {
        return (
            <div id="Header">
                <div id="navWrapper">
                    <NavLink id="icon" className="icon" to="/">
                        <img src={LogoIcon} alt="" height={80} width={80} />
                    </NavLink>
                    <div id="navBar">
                        <NavLink className="button" to="/projects">
                            <button className="btn">Projects</button>
                        </NavLink>
                        <NavLink className="button" to="/posts">
                            <button className="btn">Blog</button>
                        </NavLink>
                    </div>
                </div>
                <div id="actionWrapper">
                    <div id="loginWrapper">
                        <div id="isUser">
                            <NavLink className="button" to="/login">
                                <button className="btn">Login</button>
                            </NavLink>
                        </div>
                        <div id="signUp">
                            <NavLink className="button" to="/signup">
                                <button className="btn">Sign Up</button>
                            </NavLink>
                        </div>
                    </div>
                    <div id="menu">
                        <MenuIcon />
                    </div>
                </div>
            </div>
        );
    }
}
