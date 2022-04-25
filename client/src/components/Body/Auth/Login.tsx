import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../actions';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../fire';
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import '../../styling/css/Login.css';

export default function Login() {
    const [email, setEmail] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();

    // const user = useSelector((state: any) => state.user.user);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email!, password!)
            .then((userCredential) => {
                dispatch(
                    setUser({
                        email: auth.currentUser!.email,
                        phoneNumber: auth.currentUser!.phoneNumber,
                        displayName: auth.currentUser!.displayName,
                        uid: auth.currentUser!.uid,
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
        <>
            <Header />
            <main>
                <div id="Body">
                    <div id="Anchor">
                        <form id="loginForm" className="form" onSubmit={handleSubmit}>
                            <div className="input-wrapper">
                                <input
                                    id="email"
                                    type="email"
                                    onChange={({ target }) => setEmail(target.value)}
                                    placeholder="Email"
                                    autoComplete="username"
                                    required
                                />
                                <br />
                                <input
                                    id="password"
                                    className="input"
                                    type="password"
                                    onChange={({ target }) => setPassword(target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    required
                                />
                                <div className="button">
                                    <button type="submit" className="btn" form="loginForm">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
