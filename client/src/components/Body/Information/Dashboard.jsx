import React, { useState, useEffect } from 'react';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

import { useSearchParams } from 'react-router-dom';

import '../../styling/css/Dashboard.css';

export default function Dashboard({ CSRFToken }) {
    const url = window.location.host;
    //TODO: Add Content

    useEffect(() => {
        console.dir(url);
    }, [url]);

    return (
        <>
            <Header />
            <main>
                <div id="Body">Dashboard</div>
            </main>
            <Footer />
        </>
    );
}
