import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../fire';

import '../styling/css/FullPage.css';

export default function FullPage({ CSRFToken }) {
    const [searchParams] = useSearchParams();

    return (
        <div id="Body">
            <div className="contentWrapper no-deco">
                <h1>{'title'}</h1>
                <p>{'content'}</p>
            </div>
        </div>
    );
}
