import React from 'react'; //useEffect, useState
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import '../../styling/css/Settings.css';

export default function Settings() {
    return (
        <>
            <Header />
            <main>
                <div id="Body">Settings</div>
            </main>
            <Footer />
        </>
    );
}
