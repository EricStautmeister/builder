import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { setPosts, setProjects } from '../../../actions';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../../../fire';

import '../../styling/css/Projects.css';

function Listing({ mode }) {
    const dispatch = useDispatch();
    const uid = auth.currentUser.uid;

    const subscriptions = useSelector((state) => state.subscriptions);
    const [currentlyOnDisplay, setCurrentlyOnDisplay] = useState(null);

    const checkSubscriptions = () => {
        if (subscriptions[mode] !== undefined) {
            if (subscriptions[mode].length === 0) return false;
            return true;
        }
        return false;
    };

    const getUserDataFromFirestore = async () => {
        const cardQuery = query(collection(db, uid), where('card', '==', true));
        return new Promise((resolve, reject) => {
            getDocs(cardQuery)
                .then((querySnapshot) => {
                    const subscriptionData = { projects: [], posts: [] };
                    querySnapshot.forEach((doc) => {
                        const data = doc.data().data;
                        if (data.length) {
                            data.forEach((docdata) => {
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
        const subscriptionData = await getUserDataFromFirestore();
        dispatch(setPosts({ posts: subscriptionData.posts }));
        dispatch(setProjects({ projects: subscriptionData.projects }));
    };

    const processDataFromSubscriptions = () => {
        setCurrentlyOnDisplay(subscriptions[mode]);
    };

    const handleDataProcessing = async () => {
        try {
            if (!mode || !uid) return;
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
    }, [currentlyOnDisplay, mode, uid]);

    return (
        <div className="container">
            {currentlyOnDisplay !== null && currentlyOnDisplay.length ? (
                <div className="contentWrapper no-deco">
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
                <div className="contentWrapper no-deco">
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
