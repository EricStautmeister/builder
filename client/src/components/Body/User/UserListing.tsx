import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from './Core';
import { setPosts, setProjects } from '../../../actions';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../../../fire';
import { useSearchParams } from 'react-router-dom';

import '../../styling/css/Projects.css';

function UserListing({ mode }: { mode: string }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const subscriptions = useSelector((state: any) => state.subscriptions);
    const [currentlyOnDisplay, setCurrentlyOnDisplay] = useState<any | null>();

    const uid = searchParams.get('uid') || '';
    const dispatch = useDispatch();

    /**
     * If the subscription mode is defined and the length of the array is greater than 0, return true, otherwise
     * return false.
     * @returns a boolean value.
     */
    const checkSubscriptions = () => {
        if (subscriptions[mode] !== undefined) {
            if (subscriptions[mode].length === 0) return false;
            return true;
        }
        return false;
    };

    /**
     * It gets the data from the firestore database and returns it as a promise.
     * @returns The promise is returning an object with two keys, Project and Post. Each key has an
     * array of objects.
     */
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

    /**
     * It gets the user data from Firestore and updates the Redux store with the data.
     */
    const updateSubscriptions = async () => {
        const subscriptionData: any = await getUserDataFromFirestore();
        dispatch(setPosts({ posts: subscriptionData.posts }));
        dispatch(setProjects({ projects: subscriptionData.projects }));
    };

    /**
     * This function is called when the user clicks on the "Projects" or "Posts" tab.
     *
     * It sets the currentlyOnDisplay variable to the appropriate array of data
     * @param context - The context of the subscription. This is either projects or posts.
     */
    const processDataFromSubscriptions = () => {
        setCurrentlyOnDisplay(subscriptions[mode]);
    };

    /**
     * It checks if the user has any subscriptions. If not, it will update the subscriptions.
     * Then it will process the data from the subscriptions.
     * @returns The `handleDataProcessing` function returns a `Promise` object.
     */
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
    }, []);

    return (
        <div className="container">
            {currentlyOnDisplay !== null && currentlyOnDisplay.length ? (
                <div className="blogCards">
                    {currentlyOnDisplay.map((item: any, index: Number) => (
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
