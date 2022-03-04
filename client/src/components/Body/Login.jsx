import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../actions';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../fire.js';
import '../styling/css/Login.css';

export default function Login({ CSRFToken }, props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                // updateProfile(auth.currentUser, {
                //     displayName: 'Hans',
                // });
                dispatch(
                    setUser({
                        displayName: 'Hans',
                        email: auth.currentUser.email,
                        phoneNumber: auth.currentUser.phoneNumber,
                    })
                );
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
