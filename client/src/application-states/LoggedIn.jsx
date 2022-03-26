import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    Blog,
    Dashboard,
    Integrations,
    PostList,
    Preferences,
    Profile,
    ProjectList,
    Projects,
    Settings,
    FullPage,
    NewItem,
    Homepage,
    User,
} from '../components/Body';

function LoggedIn() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/projects" element={<Projects />}>
                    <Route path="" element={<ProjectList />} />
                    <Route
                        path="add"
                        element={<NewItem url={'/uploadProject'} />}
                    />
                    <Route path=":id" element={<FullPage />} />
                </Route>
                <Route path="/posts" element={<Blog />}>
                    <Route path="" element={<PostList />} />
                    <Route
                        path="add"
                        element={<NewItem url={'/uploadPost'} />}
                    />
                    <Route path=":id" element={<FullPage />} />
                </Route>
                <Route path="/user/*" element={<User />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/*" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default React.memo(LoggedIn);
