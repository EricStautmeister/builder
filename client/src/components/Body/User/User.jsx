import React from 'react'; //useEffect, useState
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { Home, FullPage } from '../';
import { UserBlog, UserProjects, UserLanding, Listing } from './';

import '../../styling/css/Blog.css';

export default function User() {
    const [searchParams, setSearchParams] = useSearchParams();
    const uid = searchParams.get('uid') || '';

    return (
        <>
            <Routes>
                <Route path="/" element={<UserLanding />} />
                <Route path="projects" element={<UserProjects />}>
                    <Route path="" element={<Listing mode="projects" />} />
                    <Route path=":id" element={<FullPage />} />
                </Route>
                <Route path="posts" element={<UserBlog />}>
                    <Route path="" element={<Listing mode="posts" />} />
                    <Route path=":id" element={<FullPage />} />
                </Route>
                <Route path="*" element={<UserLanding />} />
            </Routes>
        </>
    );
}
