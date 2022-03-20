import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { setProjects } from '../../../actions';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../../fire';

import '../../styling/css/Projects.css';

function ProjectList({ CSRFToken }) {
    let dispatch = useDispatch();

    const projects = useSelector((state) => state.subscriptions.projects);
    const [projectList, setProjectList] = useState(null);

    const checkSubscriptions = () => {
        if (projects === undefined) return false;
        if (projects.length === 0) {
            return false;
        }
        return true;
    };

    const fetchFromStore = async (toCollection) => {
        try {
            if (checkSubscriptions()) {
                setProjectList(projects);
                return;
            }
            const querySnapshot = await getDocs(collection(db, toCollection));
            let subscriptionData = [];
            querySnapshot.forEach((doc) =>
                subscriptionData.push({
                    title: doc.data().title,
                    content: doc.data().content,
                })
            );
            setProjectList(subscriptionData);
            dispatch(setProjects({ projects: subscriptionData }));
            return;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchFromStore('Project');
    }, []);

    return (
        <div className="container">
            {projectList !== null && projectList.length ? (
                <div className="projectCards">
                    {projectList.map((item, index) => (
                        <Card
                            key={index}
                            anchor={'projects'}
                            to={index}
                            id={item.title}
                            title={item.title}
                            content={item.content}
                        />
                    ))}
                </div>
            ) : (
                <div className="projectCards">
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
