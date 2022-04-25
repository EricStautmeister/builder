import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../actions';
import { doc, setDoc, getDocs, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../fire';
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import '../../styling/css/SignUp.css';

export default function SignUp() {
    const [username, setUsername] = useState<string | null>();
    const [email, setEmail] = useState<string | null>();
    const [emailChecker, setEmailChecker] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();
    const [passwordChecker, setPasswordChecker] = useState<string | null>();
    const [toastMode, setToastMode] = useState<string | null>('none');

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const checkInputValidity = () => {
        if (email === emailChecker && password === passwordChecker) return true;
        return false;
    };

    const setupUserDatabase = async (uid: string, type: string) => {
        if (type === 'Meta') {
            await setDoc(doc(db, uid, type), {
                card: false,
                websiteData: [],
            });
        } else {
            await setDoc(doc(db, uid, type), {
                card: true,
                data: [],
            });
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!checkInputValidity()) {
            setToastMode('block');
            return;
        }

        createUserWithEmailAndPassword(auth, email!, password!)
            .then((userCredential) => {
                // Signed in
                //FIXME: find better solution than ignoring
                // @ts-ignore
                updateProfile(auth.currentUser, {
                    displayName: username,
                })
                    .then(() => {})
                    .catch((e) => {
                        console.log(e);
                    });
                dispatch(
                    setUser({
                        //FIXME: find better solution than ignoring
                        // @ts-ignore: Object is possibly 'null'.
                        email: auth.currentUser.email,
                        // @ts-ignore: Object is possibly 'null'.
                        phoneNumber: auth.currentUser.phoneNumber,
                        // @ts-ignore: Object is possibly 'null'.
                        displayName: auth.currentUser.displayName,
                        // @ts-ignore: Object is possibly 'null'.
                        uid: auth.currentUser.uid,
                    })
                );
                const user = userCredential.user;
                console.log(`User ${user}:`, { userCredential });

                /**==================
                 *   DATABASE SETUP
                 * ================== */
                // @ts-ignore: Object is possibly 'null'.
                setupUserDatabase(auth.currentUser.uid, 'projects');
                // @ts-ignore: Object is possibly 'null'.
                setupUserDatabase(auth.currentUser.uid, 'posts');
                // @ts-ignore: Object is possibly 'null'.
                setupUserDatabase(auth.currentUser.uid, 'Meta');
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
                                    id="username"
                                    name="username"
                                    type="text"
                                    onChange={({ target }) => setUsername(target.value)}
                                    placeholder="Username"
                                    required
                                />
                                <br />
                                <input
                                    id="email"
                                    name="first email"
                                    type="email"
                                    onChange={({ target }) => setEmail(target.value)}
                                    placeholder="Email"
                                    required
                                />
                                <br />
                                <input
                                    id="email"
                                    name="confirm email"
                                    type="email"
                                    onChange={({ target }) => setEmailChecker(target.value)}
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
                                    onChange={({ target }) => setPassword(target.value)}
                                    placeholder="Password"
                                    required
                                />
                                <br />
                                <input
                                    id="password"
                                    name="confirm password"
                                    className="input"
                                    type="password"
                                    onChange={({ target }) => setPasswordChecker(target.value)}
                                    placeholder="Password"
                                    autoComplete="off"
                                    required
                                />
                                <p
                                    style={{
                                        marginBottom: '0.5rem',
                                        color: 'red',
                                        /* @ts-ignore:  Type 'string | null' is not assignable to type 'Display | undefined' Type 'null' is not assignable to type 'Display | undefined'.ts(2322)*/
                                        display: toastMode,
                                    }}>
                                    Email or Password Check failed
                                </p>
                                <br />
                                <div className="button">
                                    <button type="submit" className="btn" form="loginForm">
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
