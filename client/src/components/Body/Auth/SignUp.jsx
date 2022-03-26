import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../actions';
import { doc, setDoc, getDocs, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../fire.js';
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import '../../styling/css/SignUp.css';

export default function SignUp(props) {
    //TODO: Email Verification
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [emailChecker, setEmailChecker] = useState();
    const [password, setPassword] = useState();
    const [passwordChecker, setPasswordChecker] = useState();
    const [toastMode, setToastMode] = useState('none');

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const checkInputValidity = () => {
        if (email === emailChecker && password === passwordChecker) return true;
        return false;
    };

    const setupUserDatabase = async (uid, type) => {
        await setDoc(doc(db, uid, type), {
            data: [],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkInputValidity()) {
            setToastMode('block');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                updateProfile(auth.currentUser, {
                    displayName: username,
                })
                    .then(() => {})
                    .catch((e) => {
                        console.log(e);
                    });
                dispatch(
                    setUser({
                        email: auth.currentUser.email,
                        phoneNumber: auth.currentUser.phoneNumber,
                        displayName: auth.currentUser.displayName,
                        uid: auth.currentUser.uid,
                    })
                );
                const user = userCredential.user;
                console.log(`User ${user}:`, { userCredential });

                /**==================
                 *   DATABASE SETUP
                 * ================== */

                setupUserDatabase(auth.currentUser.uid, 'Project');
                setupUserDatabase(auth.currentUser.uid, 'Post');
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
                        <form
                            id="loginForm"
                            className="form"
                            onSubmit={handleSubmit}>
                            <div className="input-wrapper">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    onChange={({ target }) =>
                                        setUsername(target.value)
                                    }
                                    placeholder="Username"
                                    required
                                />
                                <br />
                                <input
                                    id="email"
                                    name="first email"
                                    type="email"
                                    onChange={({ target }) =>
                                        setEmail(target.value)
                                    }
                                    placeholder="Email"
                                    required
                                />
                                <br />
                                <input
                                    id="email"
                                    name="confirm email"
                                    type="email"
                                    onChange={({ target }) =>
                                        setEmailChecker(target.value)
                                    }
                                    placeholder="Email"
                                    autoComplete="off"
                                    required
                                />
                                <br />
                                <input
                                    id="password"
                                    name="first password"
                                    className="input"
                                    type="password"
                                    onChange={({ target }) =>
                                        setPassword(target.value)
                                    }
                                    placeholder="Password"
                                    required
                                />
                                <br />
                                <input
                                    id="password"
                                    name="confirm password"
                                    className="input"
                                    type="password"
                                    onChange={({ target }) =>
                                        setPasswordChecker(target.value)
                                    }
                                    placeholder="Password"
                                    autoComplete="off"
                                    required
                                />
                                <p
                                    style={{
                                        marginBottom: '0.5rem',
                                        color: 'red',
                                        display: toastMode,
                                    }}>
                                    Email or Password Check failed
                                </p>
                                <br />
                                <div className="button">
                                    <button
                                        type="submit"
                                        className="btn"
                                        form="loginForm">
                                        Sign Up
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
