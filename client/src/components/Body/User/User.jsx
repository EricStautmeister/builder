import React from 'react'; //useEffect, useState
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { Home } from '../';
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
                    <Route path="" element={<Home />} />
                    <Route path=":id" element={<Home />} />
                </Route>
                <Route path="blog" element={<UserBlog />}>
                    <Route path="" element={<Listing />} />
                    <Route path=":id" element={<Home />} />
                </Route>
                <Route path="*" element={<UserLanding />} />
            </Routes>
        </>
    );
}
