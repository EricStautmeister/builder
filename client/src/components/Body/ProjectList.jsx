import React, { useEffect, useState } from 'react';
import { Card } from './';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../fire';

import '../styling/css/Projects.css';

function ProjectList({ CSRFToken }) {
    const [projectList, setProjectList] = useState(null);
    const [doc, sdoc] = useState(null);

    const fetchFromStore = async (toCollection) => {
        const querySnapshot = await getDocs(collection(db, toCollection));
        let projects = [];
        querySnapshot.forEach((doc) =>
            projects.push({
                title: doc.data().title,
                content: doc.data().content,
            })
        );
        setProjectList(projects);
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
