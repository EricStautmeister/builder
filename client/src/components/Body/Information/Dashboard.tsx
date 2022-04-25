import React, { useState, useEffect } from 'react';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

import { useSearchParams } from 'react-router-dom';

import '../../styling/css/Dashboard.css';

export default function Dashboard() {
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
