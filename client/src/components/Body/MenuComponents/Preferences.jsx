import React from 'react'; //useEffect, useState
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import '../../styling/css/Preferences.css';

export default function Preferences({ CSRFToken }) {
    return (
        <>
            <Header />
            <main>
                <div id="Body">Preferences</div>
            </main>
            <Footer />
        </>
    );
}
