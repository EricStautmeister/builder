import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    Blog,
    Dashboard,
    Integrations,
    Preferences,
    Profile,
    Projects,
    Settings,
    FullPage,
    NewItem,
    Homepage,
    User,
    Listing,
} from '../components/Body';

function LoggedIn() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/projects" element={<Projects />}>
                    <Route path="" element={<Listing mode="projects" />} />
                    <Route path="add" element={<NewItem url={'/uploadprojects'} />} />
                    <Route path=":id" element={<FullPage mode="projects" />} />
                </Route>
                <Route path="/posts" element={<Blog />}>
                    <Route path="" element={<Listing mode="posts" />} />
                    <Route path="add" element={<NewItem url={'/uploadposts'} />} />
                    <Route path=":id" element={<FullPage mode="posts" />} />
                </Route>
                <Route path="/user/*" element={<User />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/settings" element={<Settings />} />
                {/* <Route path="/*" element={<Dashboard />} /> */}
            </Routes>
        </>
    );
}

export default React.memo(LoggedIn);
