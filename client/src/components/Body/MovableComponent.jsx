import React from 'react'; //useEffect, useState

import '../styling/css/MovableComponent.css';


export default function MovableComponent({ CSRFToken, content }) {
    return <div className='movable'>
        <p>{content}</p>
    </div>;
}
