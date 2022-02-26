import React, { useEffect, useState } from 'react';
import { Card } from './';

import './css/Projects.css';

export default function PostList({ CSRFToken }) {
    const [postList, setPostList] = useState(null);

    // useEffect(() => {
        // fetchPosts();
    // }, []);
    //TODO: Memory leak or so, cancel all subscriptions and asynchronous tasks on component unmount

    //TODO: Do not fetch if there is data in localstorage, only if data has been updated
    const fetchPosts = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
        };
        const res = await fetch(
            'http://localhost:5000/getPosts',
            requestOptions
        );
        const data = await res.json();
        setPostList(data.response);
    };

    const storeDataToSessionStorage = (postList) => {
        if (postList !== null && postList.length) {
            let index = 0;
            for (const post of postList) {
                const data = JSON.stringify(post);
                sessionStorage.setItem(`${index}`, data);
                index++;
            }
        }
    };

    storeDataToSessionStorage(postList);
    return (
        <div className="container">
            {postList !== null && postList.length ? (
                <div className="wrapper">
                    {postList.map((item, index) => (
                        <Card
                            key={index}
                            anchor={'posts'}
                            to={index}
                            data={JSON.stringify(item)}
                            title={item.title}
                            content={item.content}
                        />
                    ))}
                </div>
            ) : (
                <div className="wrapper">
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
