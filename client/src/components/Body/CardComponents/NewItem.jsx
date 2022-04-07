import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { db, auth } from '../../../fire';
import { doc, setDoc, getDocs, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import '../../styling/css/NewItem.css';

export default function NewItem({ url }) {
    const [formTitle, setFormTitle] = useState('');
    const [formContent, setFormContent] = useState('');

    const user = useSelector((state) => state.user.user);

    let navigate = useNavigate();

    const upload = async (uid, type, title, content) => {
        try {
            await updateDoc(doc(db, uid, type), {
                data: arrayUnion({ title, content }),
            });
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const type = url.replace('/upload', '');
            upload(auth.currentUser.uid, type, formTitle, formContent);
        } catch (e) {
            console.error('Error submitting: ', e);
        } finally {
            return navigate('/');
        }
    };

    //TODO: Needs better Editor
    return (
        <div id="centering">
            <form id="contentForm" className="form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
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
                    <div className="button">
                        <input
                            type="submit"
                            value="Submit"
                            className="btn"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
