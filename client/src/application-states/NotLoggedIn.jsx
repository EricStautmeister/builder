import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, SignUp, DoesntExist } from '../components/Body';
import { User } from '../components/Body';

function NotLoggedIn() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user/*" element={<User />} />
                {/* <Route path="/*" element={<Home />} /> */}
            </Routes>
        </>
    );
}

export default React.memo(NotLoggedIn);
