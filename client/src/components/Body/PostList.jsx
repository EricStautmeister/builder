import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from './';
import { setPosts } from '../../actions';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../fire';

import '../styling/css/Projects.css';

function PostList({ CSRFToken }) {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.subscriptions.posts);
    const [postList, setPostList] = useState(null);

    const checkSubscriptions = () => {
        if (posts === undefined) return false;
        if (posts.length === 0) {
            return false;
        }
        return true;
    };

    const fetchFromStore = async (toCollection) => {
        try {
            if (checkSubscriptions()) {
                setPostList(posts);
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
            setPostList(subscriptionData);
            dispatch(setPosts({ posts: subscriptionData }));
            console.log({ subscriptionData, posts, postList });
            return;
        } catch (e) {
            console.log(e);
        }
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
