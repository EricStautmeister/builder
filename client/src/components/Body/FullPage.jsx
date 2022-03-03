import React from 'react';
import { useSearchParams } from 'react-router-dom';

import '../styling/css/FullPage.css';

export default function FullPage({ CSRFToken }) {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const passedData = sessionStorage.getItem(`${id}`);

    const { title, content } = JSON.parse(passedData);
    return (
        <div id="Body">
            <div className="contentWrapper no-deco">
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
        </div>
    );
}
