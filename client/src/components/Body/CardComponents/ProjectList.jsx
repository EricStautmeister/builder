import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { setProjects } from '../../../actions';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../../../fire';

import '../../styling/css/Projects.css';

function ProjectList() {
    let dispatch = useDispatch();

    const projects = useSelector((state) => state.subscriptions.projects);
    const [currentlyOnDisplay, setCurrentlyOnDisplay] = useState(null);

    const uid = auth.currentUser.uid;

    const checkSubscriptions = () => {
        if (projects === undefined) return false;
        return projects.length > 0;
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
        dispatch(setProjects({ projects: subscriptionData.Project }));
    };

    const processDataFromSubscriptions = () => {
        setCurrentlyOnDisplay(projects);
    };

    const handleDataProcessing = async () => {
        try {
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
                    {currentlyOnDisplay.map((item, index) => (
                        <Card
                            key={index}
                            anchor={'projects'}
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

export default React.memo(ProjectList);
