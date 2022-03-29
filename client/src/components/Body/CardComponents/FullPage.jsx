import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { setPosts, setProjects } from '../../../actions';
import { db } from '../../../fire';
import { useSelector, useDispatch } from 'react-redux';

import '../../styling/css/FullPage.css';

export default function FullPage() {
    const [data, setData] = useState(null);
    const subscriptions = useSelector((state) => state.subscriptions);
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const context = window.location.pathname.split('/')[2];
    const uid = searchParams.get('uid') || '';
    const id = window.location.pathname.split('/')[3];

    const checkStore = () => {
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
        dispatch(setProjects(subscriptionData.Project));
        dispatch(setPosts(subscriptionData.Post));
    };

    const processDataFromSubscriptions = (context) => {
        let filtered;
        if (context === 'projects') {
            filtered = subscriptions.projects.filter((card) => card.title === id);
        }
        if (context === 'posts' || 'blog') {
            filtered = subscriptions.posts.filter((card) => card.title === id);
        }
        const { title, content } = filtered[0];
        setData({ title, content });

        throw new Error('Store Context Error');
    };

    const handleDataProcessing = async () => {
        try {
            if (!context || !id) return;
            if (!checkStore()) {
                updateSubscriptions();
            }
            processDataFromSubscriptions(context);
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
