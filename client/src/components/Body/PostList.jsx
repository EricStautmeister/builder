import React, { useState, useEffect } from 'react';
import { Card } from './';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../fire';

import '../styling/css/Projects.css';

function PostList({ CSRFToken }) {
    const [postList, setPostList] = useState(null);

    const fetchFromStore = async (toCollection) => {
        const querySnapshot = await getDocs(collection(db, toCollection));
        let projects = [];
        querySnapshot.forEach((doc) =>
            projects.push({
                title: doc.data().title,
                content: doc.data().content,
            })
        );
        setPostList(projects);
    };

    useEffect(() => {
        fetchFromStore('Post');
    }, []);

    return (
        <div className="container">
            {postList !== null && postList.length ? (
                <div className="blogCards">
                    {postList.map((item, index) => (
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

export default React.memo(PostList);
