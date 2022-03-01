import React, { useState } from 'react';
import { Card } from './';

import '../styling/css/Projects.css';

function PostList({ CSRFToken }) {
    const [postList, setPostList] = useState(null);

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

export default React.memo(PostList);