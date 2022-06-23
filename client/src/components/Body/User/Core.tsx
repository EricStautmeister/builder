import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    data: any;
    to: string;
};

export function Button({ data, to }: Props) {
    return (
        <NavLink className="button" to={to}>
            <div className="btn">{data}</div>
        </NavLink>
    );
}

export function Card(props: any) {
    return (
        <NavLink
            className="no-deco"
            to={`/user/${props.anchor}/i?id=${props.title}&uid=${props.uid}`}>
            <div id="cardAnchor">
                <h1>{props.title}</h1>
                <p>{props.content}</p>
            </div>
        </NavLink>
    );
}

export function Navigation({ uid }: { uid: string }) {
    return (
        <header>
            <div id="navWrapper">
                <nav id="navBar">
                    <Button data="Home" to={`/user/?uid=${uid}`}></Button>
                    <Button data="Blog" to={`/user/posts/?uid=${uid}`}></Button>
                    <Button data="Projects" to={`/user/projects/?uid=${uid}`}></Button>
                </nav>
            </div>
        </header>
    );
}

export function Footer() {
    return <></>;
}
