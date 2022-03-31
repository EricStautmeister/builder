import React from 'react';
import { Navigation, Footer } from './Core';
import { useSearchParams } from 'react-router-dom';

export default function UserLanding() {
    const [searchParams, setSearchParams] = useSearchParams();
    const uid = searchParams.get('uid') || '';
    return (
        <>
            <Navigation uid={uid} />
            <div id="Body">
                <h1> Homepage </h1>
                <p>How yall doingc</p>
            </div>
            <Footer />
        </>
    );
}
