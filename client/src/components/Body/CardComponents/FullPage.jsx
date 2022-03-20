import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../../fire';
import { useSelector } from 'react-redux';

import '../../styling/css/FullPage.css';

export default function FullPage({ CSRFToken }) {
    const [searchParams] = useSearchParams();
    const context = searchParams.get('context');
    const id = searchParams.get('id');
    const subscriptions = useSelector((state) => state.subscriptions);
    const [data, setData] = useState(null);
    console.log('root root', { context, id, subscriptions, data });

    const getDataFromStore = () => {
        if (!context) return;
        if (context === 'projects') {
            const filtered = subscriptions.projects.filter(
                (card) => card.title === id
            );
            const { title, content } = filtered[0];

            setData({ title, content });
        }
        if (context === 'posts') {
            const filtered = subscriptions.posts.filter(
                (card) => card.title === id
            );
            console.log('root', { filtered });

            const { title, content } = filtered[0];

            setData({ title, content });
        }
    };

    useEffect(() => {
        getDataFromStore();
    }, []);

    return (
        <div id="Body">
            <div className="contentWrapper no-deco">
                {data ? (
                    <>
                        <h1>{data.title}</h1>
                        <p>{data.content}</p>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
