import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../fire.js';

import '../../styling/css/SignUp.css';

export default function SignUp({ CSRFToken }, props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(`User ${user}:`, { userCredential });
                props.history.push('/');
            })
            .then((data) => {
                return navigate('/');
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
                    <div className="input-wrapper">
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
                    </div>
                    <br />
                    <button type="submit" className="form-btn" form="loginForm">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
