import React, { useState } from 'react';

export default function NewProject({ CSRFToken, url }) {
    const [formTitle, setFormTitle] = useState('');
    const [formContent, setFormContent] = useState('');

    const postReq = async (httpAnchor, data) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'xsrf-token': CSRFToken,
                mode: 'cors',
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
        };
        const response = await fetch(
            `http://localhost:5000${httpAnchor}`,
            requestOptions
        );
        return await response.json();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postReq(url, {
            title: formTitle,
            content: formContent,
        }).then((data) => {
            console.log(data);
        });
    };

    //TODO: Add text modifiers, maybe a markdown plugin or so
    return (
        <div id="Anchor">
            <form id="loginForm" className="form" onSubmit={handleSubmit}>
                <input
                    id="itemTitle"
                    type="text"
                    value={formTitle}
                    onChange={({ target }) => setFormTitle(target.value)}
                    placeholder="Title"
                />
                <textarea
                    id="itemContent"
                    className="textArea"
                    type="text"
                    value={formContent}
                    onChange={({ target }) => setFormContent(target.value)}
                    placeholder="Type Entry Here"
                />
                <input type="submit" value="Submit" className="btn" />
            </form>
        </div>
    );
}
