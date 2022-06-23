import React from 'react'; //useEffect, useState
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { FullPage } from '..';
import { UserBlog, UserProjects, UserLanding, UserListing } from './index';

import '../../styling/css/Blog.css';

export default function User() {
    const [searchParams, setSearchParams] = useSearchParams();
    // const uid = searchParams.get('uid') || '';

    return (
        <>
            <Routes>
                <Route path="/" element={<UserLanding />} />
                <Route path="projects" element={<UserProjects />}>
                    <Route path="" element={<UserListing mode="projects" />} />
                    <Route path=":id" element={<FullPage mode="projects" />} />
                </Route>
                <Route path="posts" element={<UserBlog />}>
                    <Route path="" element={<UserListing mode="posts" />} />
                    <Route path=":id" element={<FullPage mode="posts" />} />
                </Route>
                <Route path="*" element={<UserLanding />} />
            </Routes>
        </>
    );
}
