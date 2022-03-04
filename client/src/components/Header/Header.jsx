import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../fire';
import { useSelector } from 'react-redux';

import '../styling/css/Header.css';
import Menu from './Menu.jsx';
import LogoIcon from '../styling/media/logo.png';

function Header() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const signout = () => {
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div id="Header">
            {isLoggedIn ? (
                <>
                    <div id="navWrapper">
                        <div id="navBar">
                            <NavLink id="icon" className="icon" to="/">
                                <img
                                    src={LogoIcon}
                                    alt=""
                                    height={80}
                                    width={80}
                                />
                            </NavLink>
                            <NavLink className="button" to="/homepage">
                                <button className="btn">Homepage</button>
                            </NavLink>
                            <NavLink className="button" to="/projects">
                                <button className="btn">Projects</button>
                            </NavLink>
                            <NavLink className="button" to="/posts">
                                <button className="btn">Blog</button>
                            </NavLink>
                        </div>
                        <div id="actionWrapper" className="right-align">
                            <div id="logoutWrapper">
                                <NavLink to={'/'}>
                                    <div id="isUser">
                                        <button
                                            className="btn"
                                            onClick={signout}>
                                            Sign Out
                                        </button>
                                    </div>
                                </NavLink>
                            </div>
                            <Menu isLoggedIn={isLoggedIn} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div id="navBar">
                        <NavLink id="icon" className="icon" to="/">
                            <img src={LogoIcon} alt="" height={80} width={80} />
                        </NavLink>
                    </div>
                    <div id="loginWrapper">
                        <div id="login">
                            <NavLink className="button" to="/login">
                                <button className="btn">Login</button>
                            </NavLink>
                        </div>
                        <div id="signUp">
                            <NavLink className="button" to="/signup">
                                <button className="btn">Sign Up</button>
                            </NavLink>
                        </div>
                        <Menu isLoggedIn={isLoggedIn} />
                    </div>
                </>
            )}
        </div>
    );
}

export default React.memo(Header);
