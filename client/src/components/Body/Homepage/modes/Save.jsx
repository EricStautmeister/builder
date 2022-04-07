import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { WINDOWS } from '../constants';
import { db, auth } from '../../../../fire.js';
import { doc, setDoc, getDocs, collection, updateDoc, arrayUnion } from 'firebase/firestore';

export default function Save({ Items }) {
    const uid = auth.currentUser.uid;
    let navigate = useNavigate();

    const filterForUsedItems = (items) => {
        return items.filter((item) => item.displayContext === WINDOWS.MAINWINDOW);
    };

    const compileData = (items) => {
        if (!items) return false;
        if (items.length === 0) return false;
        const allJsx = items.map((item) => {
            return item.jsx();
        });

        return {
            compiledHomepage: (
                <React.Fragment>
                    {allJsx.map((jsxElement) => (
                        <>{jsxElement}</>
                    ))}
                </React.Fragment>
            ),
        };
    };

    const upload = async (uid, collection, data) => {
        try {
            //TODO: First Add some Verification/Buffer for less saves
            const uploadData = data
                ? compileData(filterForUsedItems(data)).compiledHomepage
                : false;
            const stringifiedData = JSON.stringify(uploadData);
            console.log({
                Items,
                collection,
                uploadData,
                restringified: JSON.stringify(stringifiedData),
            });
            if (!uploadData) throw new Error('No Data to Upload');
            await updateDoc(doc(db, uid, collection), {
                websiteData: stringifiedData,
            });
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            upload(uid, 'Meta', Items);
        } catch (e) {
            console.error('Error submitting: ', e);
        } finally {
            return navigate('/');
        }
    };

    return (
        <div className="button">
            <button className="btn" onClick={handleSubmit}>
                -Save-
            </button>
        </div>
    );
}
