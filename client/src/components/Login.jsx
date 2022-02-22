import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './css/Login.css';

export default function Login({ setJWT, JWT }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [csrfToken, setCsrfToken] = useState();

    const getCSRFToken = async (httpAnchor) => {
        const serverUrl = 'http://localhost:5000';
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                mode: 'cors',
            },
            mode: 'cors',
            credentials: 'include',
        };
        const response = await fetch(
            `${serverUrl}${httpAnchor}`,
            requestOptions
        );
        const data = await response.json();
        setCsrfToken(data.csrfToken);
    };

    useEffect(() => {
        getCSRFToken('/process');
    }, []);

    async function loginUser(credentials) {
        return fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'xsrf-token': csrfToken,
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(credentials),
        }).then((data) => data.json());
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = await loginUser({
            username,
            password,
        });
        setJWT(token);
    };

    return (
        <div id="Anchor">
            <form id="loginForm" className="form" onSubmit={handleSubmit}>
                <input
                    id="itemTitle"
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="@user"
                />
                <input
                    id="itemContent"
                    className="input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                />
                <input type="submit" value="Submit" className="btn" />
            </form>
        </div>
    );
}

Login.propTypes = {
    setJWT: PropTypes.func.isRequired,
};
