import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Blog, Projects } from '../components/Body';

/* Heavy Items */
const Homepage = React.lazy(() => import('../components/Body/Homepage/Homepage'));
const User = React.lazy(() => import('../components/Body/User/User'));
const Listing = React.lazy(() => import('../components/Body/CardComponents/Listing'));

/* Far away from loading */
const FullPage = React.lazy(() => import('../components/Body/CardComponents/FullPage'));
const NewItem = React.lazy(() => import('../components/Body/CardComponents/NewItem'));

/* Menu Items */
const Profile = React.lazy(() => import('../components/Body/MenuComponents/Profile'));
const Settings = React.lazy(() => import('../components/Body/MenuComponents/Settings'));
const Preferences = React.lazy(() => import('../components/Body/MenuComponents/Preferences'));
const Integrations = React.lazy(() => import('../components/Body/MenuComponents/Integrations'));

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
