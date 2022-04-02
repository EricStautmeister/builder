import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from './Core';
import { setPosts, setProjects } from '../../../actions';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../../fire';
import { useSearchParams } from 'react-router-dom';

import '../../styling/css/Projects.css';

function UserListing({ mode }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const subscriptions = useSelector((state) => state.subscriptions);
    const [currentlyOnDisplay, setCurrentlyOnDisplay] = useState(null);

    const uid = searchParams.get('uid') || '';
    const dispatch = useDispatch();

    /**
     * Check if the user has any subscriptions for the given context
     * @param context - The context of the subscription. This is either `projects`, `posts`, or `blog`.
     * @returns a boolean value.
     */
    const checkSubscriptions = (context) => {
        if (context === 'projects') {
            return subscriptions.projects.length > 0;
        }
        if (context === 'posts' || 'blog') {
            return subscriptions.posts.length > 0;
        }
        throw new Error('Store Context Error');
    };

    /**
     * It gets the data from the firestore database and returns it as a promise.
     * @returns The promise is returning an object with two keys, Project and Post. Each key has an
     * array of objects.
     */
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

    /**
     * It gets the user data from Firestore and updates the Redux store with the data.
     */
    const updateSubscriptions = async () => {
        const subscriptionData = await getUserDataFromFirestore();
        dispatch(setPosts({ posts: subscriptionData.Post }));
        dispatch(setProjects({ projects: subscriptionData.Project }));
    };

    /**
     * This function is called when the user clicks on the "Projects" or "Posts" tab. 
     * 
     * It sets the currentlyOnDisplay variable to the appropriate array of data
     * @param context - The context of the subscription. This is either projects or posts.
     */
    const processDataFromSubscriptions = (context) => {
        if (context === 'projects') setCurrentlyOnDisplay(subscriptions.projects);
        if (context === 'posts') setCurrentlyOnDisplay(subscriptions.posts);
    };

    /**
     * It checks if the user has any subscriptions. If not, it will update the subscriptions.
     * Then it will process the data from the subscriptions.
     * @returns The `handleDataProcessing` function returns a `Promise` object.
     */
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

export default React.memo(UserListing);
