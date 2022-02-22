import React, { useEffect, useState } from 'react';
import { Card } from './';

import './css/Projects.css';

export default function ProjectList({ JWT }){
    const [projectList, setProjectList] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);
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
            'http://localhost:5000/getProjects',
            requestOptions
        );
        const data = await res.json();
        setProjectList(data.response);
    };

    const storeDataToSessionStorage = (projectList) => {
        if (projectList !== null && projectList.length) {
            let index = 0;
            for (const post of projectList) {
                const data = JSON.stringify(post);
                sessionStorage.setItem(`${index}`, data);
                index++;
            }
        }
    };

    storeDataToSessionStorage(projectList);
    return (
        <div className="container">
            {projectList !== null && projectList.length ? (
                <div className="wrapper">
                    {projectList.map((item, index) => (
                        <Card
                            key={index}
                            anchor={'projects'}
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
