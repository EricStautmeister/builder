import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fire.js';

import './css/SignUp.css';

export default function SignUp({ CSRFToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(`User ${user}:`, { userCredential });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`);
            });
    };

    return (
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
                <input type="submit" value="Sign In" className="btn" />
            </form>
        </div>
    );
}
