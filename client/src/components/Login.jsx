import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '../fire.js';

import './css/Login.css';

export default function Login({ CSRFToken, setUser }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                updateProfile(auth.currentUser, {
                    displayName: 'Hans',
                });
            }).then((data) => {
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
                    <br />
                    <button type="submit" className="btn" form="loginForm">
                        Login
                    </button>
                    
                </form>
            </div>
        </div>
    );
}
