import React, { useState, useEffect } from 'react';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export default function DoesntExist() {
    return (
        <>
            <Header />
            <main>
                <div id="Body">This site doesn't exist.</div>
            </main>
            <Footer />
        </>
    );
}
