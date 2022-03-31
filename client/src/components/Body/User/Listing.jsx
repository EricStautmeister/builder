import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from './Core';
import { setPosts, setProjects } from '../../../actions';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../../fire';
import { useSearchParams } from 'react-router-dom';

import '../../styling/css/Projects.css';

function Listing({ mode }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const subscriptions = useSelector((state) => state.subscriptions);
    const [currentlyOnDisplay, setCurrentlyOnDisplay] = useState(null);

    const uid = searchParams.get('uid') || '';
    const dispatch = useDispatch();

    const checkSubscriptions = (context) => {
        if (context === 'projects') {
            return subscriptions.projects.length > 0;
        }
        if (context === 'posts' || 'blog') {
            return subscriptions.posts.length > 0;
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
                        console.log(doc.id, data)
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

    const processDataFromSubscriptions = (context) => {
        if (mode === 'projects') setCurrentlyOnDisplay(subscriptions.projects);
        if (mode === 'posts') setCurrentlyOnDisplay(subscriptions.posts);
    };

    const handleDataProcessing = async () => {
        try {
            if (!mode || !uid) return;
            if (!checkSubscriptions(mode)) {
                await updateSubscriptions();
            }
            await processDataFromSubscriptions(mode);
        } catch (e) {
            throw new Error(`Data Fetching Error: ${e}`);
        }
    };

    useEffect(() => {
        handleDataProcessing();
    }, []);

    const consumeStore = async (modeData) => {
        try {
            if (checkSubscriptions()) {
                setCurrentlyOnDisplay(modeData);
                return;
            }
            const querySnapshot = await getDocs(collection(db, uid));
            let subscriptionData = { Project: [], Post: [] };
            querySnapshot.forEach((doc) => {
                const data = doc.data().data;
                if (data.length) {
                    data.forEach((docdata) => {
                        subscriptionData[doc.id].push(docdata);
                    });
                }
            });
            if (mode === 'projects') setCurrentlyOnDisplay(subscriptionData.Project);
            if (mode === 'posts') setCurrentlyOnDisplay(subscriptionData.Post);
            dispatch(setPosts({ posts: subscriptionData.Post }));
            dispatch(setProjects({ projects: subscriptionData.Project }));
            return;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (mode === 'projects') consumeStore(subscriptions.projects);
        if (mode === 'posts') consumeStore(subscriptions.posts);
    }, [mode]);

    return (
        <div className="container">
            {currentlyOnDisplay !== null && currentlyOnDisplay.length ? (
                <div className="blogCards">
                    {currentlyOnDisplay.map((item, index) => (
                        <Card
                            key={index}
                            anchor={mode}
                            to={index}
                            id={item.title}
                            title={item.title}
                            content={item.content}
                            uid={uid}
                        />
                    ))}
                </div>
            ) : (
                <div className="blogCards">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            )}
        </div>
    );
}

export default React.memo(Listing);
