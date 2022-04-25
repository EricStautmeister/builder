import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styling/css/Card.css';

function Card(props: any) {
    return (
        <NavLink className="no-deco" to={`/${props.anchor}/i?id=${props.id}`}>
            <div id="cardAnchor">
                <h1>{props.title}</h1>
                <p>{props.content}</p>
            </div>
        </NavLink>
    );
}

export default React.memo(Card);
