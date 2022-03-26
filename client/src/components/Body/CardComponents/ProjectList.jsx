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
    const [projectList, setProjectList] = useState(null);

    const checkSubscriptions = () => {
        if (projects === undefined) return false;
        if (projects.length === 0) {
            return false;
        }
        return true;
    };

    const fetchFromStore = async () => {
        try {
            if (checkSubscriptions()) {
                setProjectList(projects);
                return;
            }
            const querySnapshot = await getDocs(
                collection(db, auth.currentUser.uid)
            );
            let subscriptionData = { Project: [], Post: [] };
            querySnapshot.forEach((doc) => {
                const data = doc.data().data;
                if (data.length) {
                    data.forEach((docdata) => {
                        subscriptionData[doc.id].push(docdata);
                    });
                }
            });
            setProjectList(subscriptionData.Project);
            dispatch(setProjects({ projects: subscriptionData.Project }));
            return;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchFromStore();
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
