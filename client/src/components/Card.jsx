import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './css/Card.css';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            id: props.to,
            content: props.content,
        };
    }

    render() {
        const { title, id, content } = this.state;
        console.log(content)
        return (
            <div id="cardAnchor">
                <NavLink
                    className="no-deco"
                    to={`/projects/i?id=${id}`}>
                    <h1>{title}</h1>
                    <p>{content}</p>
                </NavLink>
            </div>
        );
    }
}
