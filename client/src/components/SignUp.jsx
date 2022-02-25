import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fire.js';

import './css/SignUp.css';

export default function SignUp({ CSRFToken }, props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(`User ${user}:`, { userCredential });
                props.history.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`);
            });
    };

    return (
        <div id="Body">
            <div id="Anchor">
                <form id="loginForm" className="form" onSubmit={handleSubmit}>
                    <input
                        id="itemTitle"
                        type="email"
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="Email"
                        required
                    />
                    <br />
                    <input
                        id="itemContent"
                        className="input"
                        type="password"
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Password"
                        required
                    />
                    <NavLink to='/' >
                        <button type="submit" className="btn" form='loginForm'>Sign Up</button>
                    </NavLink>
                </form>
            </div>
        </div>
    );
}
