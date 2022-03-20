import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { db } from '../../../fire';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

export default function NewProject({ CSRFToken, url }) {
    const [formTitle, setFormTitle] = useState('');
    const [formContent, setFormContent] = useState('');

    let navigate = useNavigate();

    const upload = async (toCollection) => {
        try {
            await setDoc(doc(db, toCollection, formTitle), {
                title: formTitle,
                content: formContent,
            });
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
        const toCollection = url.replace('/upload', '');
        upload(toCollection);
        } catch(e) {
            console.error('Error submitting: ', e);

        } finally {
            return navigate('/');
        }
        
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
                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
}
