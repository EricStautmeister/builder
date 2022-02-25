import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../fire.js';

import './css/Login.css';

export default function Login({ CSRFToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                console.log({ email: user.user.email })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`)
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
