import React from 'react'; //useEffect, useState
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import '../../styling/css/Integrations.css';

export default function Integrations({ CSRFToken }) {
    return (
        <>
            <Header />
            <main>
                <div id="Body">Integrations</div>
            </main>
            <Footer />
        </>
    );
}
