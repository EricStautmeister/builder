import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../';
import { setPosts } from '../../../actions';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../../fire';

import '../../styling/css/Projects.css';

function PostList() {
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

    const fetchFromStore = async () => {
        try {
            if (checkSubscriptions()) {
                setPostList(posts);
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
            setPostList(subscriptionData.Post);
            dispatch(setPosts({ posts: subscriptionData.Post }));
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
            {postList !== null && postList.length ? (
                <div className="blogCards">
                    {postList.map((item, index) => (
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

export default React.memo(PostList);
