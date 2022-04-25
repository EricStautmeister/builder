import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { setPosts, setProjects } from '../../../actions';
import { db, auth } from '../../../fire';
import { useSelector, useDispatch } from 'react-redux';

import '../../styling/css/FullPage.css';

export default function FullPage({ mode }: { mode: string }) {
    const dispatch = useDispatch();
    const [data, setData] = useState<any | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const subscriptions = useSelector((state: any) => state.subscriptions);

    const uid = searchParams.get('uid') || auth.currentUser!.uid;
    const id = searchParams.get('id') || '';
    const modeFallback = mode ? mode : window.location.pathname.split('/')[2];

    const checkSubscriptions = () => {
        if (subscriptions[modeFallback] !== undefined) {
            return subscriptions[modeFallback].filter((card: any) => card.title === id).length > 0;
        }
        return false;
    };

    const getUserDataFromFirestore = async () => {
        const cardQuery = query(collection(db, uid), where('card', '==', true));
        return new Promise((resolve, reject) => {
            getDocs(cardQuery)
                .then((querySnapshot) => {
                    const subscriptionData: any = { projects: [], posts: [] };
                    querySnapshot.forEach((doc) => {
                        const data = doc.data().data;
                        if (data.length) {
                            data.forEach((docdata: any) => {
                                subscriptionData[doc.id].push(docdata);
                            });
                        }
                    });
                    console.log(subscriptionData);
                    resolve(subscriptionData);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const updateSubscriptions = async () => {
        const subscriptionData: any = await getUserDataFromFirestore();
        dispatch(setPosts({ posts: subscriptionData.posts }));
        dispatch(setProjects({ projects: subscriptionData.projects }));
    };

    const parseCard = () => {
        try {
            const title = id.replace('%20', ' ');
            return subscriptions[modeFallback].filter((card: any) => card.title === title);
        } catch (err) {
            console.log(err);
        }
    };

    const processDataFromSubscriptions = () => {
        const filtered = parseCard();
        const { title, content } = filtered[0];
        setData({ title, content });
        if (data !== null) return;
        throw new Error('Store Context Error');
    };

    const handleDataProcessing = async () => {
        try {
            if (!modeFallback || !id) return;
            if (!checkSubscriptions()) {
                await updateSubscriptions();
            }
            await processDataFromSubscriptions();
        } catch (e) {
            throw new Error(`Data Fetching Error: ${e}`);
        }
    };

    useEffect(() => {
        handleDataProcessing();
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
