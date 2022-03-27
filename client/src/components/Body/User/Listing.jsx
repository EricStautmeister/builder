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

    const checkSubscriptions = (toVerifyArray) => {
        if (toVerifyArray === undefined) return false;
        if (toVerifyArray.length === 0) {
            return false;
        }
        return true;
    };

    const fetchFromStore = async (modeData) => {
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
            if (mode === 'projects')
                setCurrentlyOnDisplay(subscriptionData.Project);
            if (mode === 'posts') setCurrentlyOnDisplay(subscriptionData.Post);
            dispatch(setPosts({ posts: subscriptionData.Post }));
            dispatch(setProjects({ projects: subscriptionData.Project }));
            return;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (mode === 'projects') fetchFromStore(subscriptions.projects);
        if (mode === 'posts') fetchFromStore(subscriptions.posts);
        console.log({ currentlyOnDisplay, subscriptions });
    }, [mode]);

    return (
        <div className="container">
            {currentlyOnDisplay !== null && currentlyOnDisplay.length ? (
                <div className="blogCards">
                    {currentlyOnDisplay.map((item, index) => (
                        <Card
                            key={index}
                            anchor={'blog'}
                            to={index}
                            id={item.title}
                            title={item.title}
                            content={item.content}
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
