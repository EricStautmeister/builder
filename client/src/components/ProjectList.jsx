import React, { useState } from 'react';
import { Card } from './';

import './css/Projects.css';

function ProjectList({ CSRFToken }){
    const [projectList, setProjectList] = useState(null);

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

export default React.memo(ProjectList);