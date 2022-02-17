import React, { Component } from 'react'; //useEffect, useState
import { Card } from './';

import './css/Projects.css';

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: null,
        };
    }

    componentDidMount() {
        this.fetchPosts();
    }

    //TODO: Instead of localstorage, use session storage

    //TODO: Do not fetch if there is data in localstorage, only if data has been updated

    //TODO: Also, perhaps localstorage should be cleaned every now and then storage.clear(str) or .removeItem(str)

    fetchPosts = async () => {
        const res = await fetch('http://localhost:5000/getProjects');
        const data = await res.json();
        this.setState({
            projectList: data.response,
        });
    };

    storeDataToLocalStorage = (projectList) => {
        if (projectList !== null && projectList.length) {
            const { projectList } = this.state;
            let index = 0;
            for (const project of projectList) {
                const data = JSON.stringify(project);
                localStorage.setItem(`${index}`, data);
                index++;
            }
        }
    };

    render() {
        const { projectList } = this.state;
        this.storeDataToLocalStorage(projectList);
        // console.dir(projectList); //FIXME: This runs twice per render, find out why and potentially fix it
        return (
            <div className="container">
                {projectList !== null && projectList.length ? (
                    <div className="wrapper">
                        {projectList.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    to={index}
                                    data={JSON.stringify(item)}
                                    title={item.title}
                                    content={item.content}
                                />
                            );
                        })}
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
}
