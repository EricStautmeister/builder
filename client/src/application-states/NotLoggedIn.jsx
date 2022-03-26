import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/Header';
import { Home, Login, SignUp } from '../components/Body';
import { Footer } from '../components/Footer';

function NotLoggedIn({ CSRFToken }) {
    //TODO: Needs base domain and subdomain [[USER]] for differentiation
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home CSRFToken={CSRFToken} />} />
                <Route
                    path="/login"
                    element={<Login CSRFToken={CSRFToken} />}
                />
                <Route
                    path="/signup"
                    element={<SignUp CSRFToken={CSRFToken} />}
                />
                <Route path="/*" element={<Home CSRFToken={CSRFToken} />} />
            </Routes>
            <Footer />
        </>
    );
}

export default React.memo(NotLoggedIn);
