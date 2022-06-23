import React from 'react'; //useEffect, useState
import { Outlet, useSearchParams } from 'react-router-dom';
import { Navigation, Footer } from './Core';

export default function UserProjects() {
    const [searchParams, setSearchParams] = useSearchParams();
    const uid = searchParams.get('uid') || '';

    return (
        <>
            <Navigation uid={uid} />
            <Outlet />
            <Footer />
        </>
    );
}
