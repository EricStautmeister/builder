import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { db } from '../../fire';
import { addDoc, getDocs, collection } from 'firebase/firestore';

export default function NewProject({ CSRFToken, url }) {
    const [formTitle, setFormTitle] = useState('');
    const [formContent, setFormContent] = useState('');

    const upload = async (toCollection) => {
        try {
            const docRef = await addDoc(collection(db, toCollection), {
                title: formTitle,
                content: formContent,
            });
            console.info(
                'Document written with ID: ',
                docRef.id,
                '\nFirestore responce:',
                { docRef }
            );
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const toCollection = url.replace('/upload', '');
        upload(toCollection);
        const querySnapshot = await getDocs(collection(db, toCollection));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${{ data: doc.data() }}`);
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
                <NavLink to="/">
                    <input type="submit" value="Submit" className="btn" />
                </NavLink>
            </form>
        </div>
    );
}
