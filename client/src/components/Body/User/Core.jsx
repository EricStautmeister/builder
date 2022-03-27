import React from 'react'; //useEffect, useState
import { NavLink, Outlet } from 'react-router-dom';

export function Button({ data, to }) {
    return (
        <NavLink className="button" to={to}>
            <div className="btn">{data}</div>
        </NavLink>
    );
}

export function Card(props) {
    return (
        <NavLink
            className="no-deco"
            to={`/user/${props.anchor}/${props.title}`}>
            <div id="cardAnchor">
                <h1>{props.title}</h1>
                <p>{props.content}</p>
            </div>
        </NavLink>
    );
}

export function Navigation({ uid }) {
    return (
        <header>
            <div id="navWrapper">
                <nav id="navBar">
                    <Button data="Home" to={`/user/?uid=${uid}`}></Button>
                    <Button data="Blog" to={`/user/blog/?uid=${uid}`}></Button>
                    <Button
                        data="Projects"
                        to={`/user/projects/?uid=${uid}`}></Button>
                </nav>
            </div>
        </header>
    );
}

export function Footer() {
    return <></>;
}
