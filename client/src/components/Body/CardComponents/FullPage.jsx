import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { setPosts, setProjects } from '../../../actions';
import { db } from '../../../fire';
import { useSelector, useDispatch } from 'react-redux';

import '../../styling/css/FullPage.css';

export default function FullPage() {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const subscriptions = useSelector((state) => state.subscriptions);

    const context = window.location.pathname.split('/')[2];
    const uid = searchParams.get('uid') || '';
    const id = window.location.pathname.split('/')[3];

    const checkSubscriptions = () => {
        if (context === 'projects') {
            return subscriptions.projects.filter((card) => card.title === id).length > 0;
        }
        if (context === 'posts' || 'blog') {
            return subscriptions.posts.filter((card) => card.title === id).length > 0;
        }
        throw new Error('Store Context Error');
    };

    const getUserDataFromFirestore = async () => {
        return new Promise((resolve, reject) => {
            getDocs(collection(db, uid))
                .then((snapshot) => {
                    const subscriptionData = { Project: [], Post: [] };
                    snapshot.forEach((doc) => {
                        const data = doc.data().data;
                        console.log(doc.id, data);
                        if (data.length) {
                            data.forEach((docdata) => {
                                subscriptionData[doc.id].push(docdata);
                            });
                        }
                    });
                    resolve(subscriptionData);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const updateSubscriptions = async () => {
        const subscriptionData = await getUserDataFromFirestore();
        console.log({ subscriptionData, subscriptions });
        dispatch(setPosts({ posts: subscriptionData.Post }));
        dispatch(setProjects({ projects: subscriptionData.Project }));
    };

    const parseCard = (context) => {
        if (context === 'projects') {
            return subscriptions.projects.filter((card) => card.title === id);
        }
        if (context === 'posts' || 'blog') {
            console.log(`filtering ${context} id:${id}`, subscriptions.posts);
            return subscriptions.posts.filter((card) => card.title === id);
        }
    };

    const processDataFromSubscriptions = (context) => {
        const filtered = parseCard(context);
        console.log(parseCard(context));
        const { title, content } = filtered[0];
        setData({ title, content });

        throw new Error('Store Context Error');
    };

    const handleDataProcessing = async () => {
        try {
            if (!context || !id) return;
            if (!checkSubscriptions()) {
                await updateSubscriptions();
            }
            await processDataFromSubscriptions(context);
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
