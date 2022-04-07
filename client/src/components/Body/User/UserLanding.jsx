import React, { useEffect, useState } from 'react';
import { Navigation, Footer } from './Core';
import { useSearchParams } from 'react-router-dom';
import { db, auth } from '../../../fire.js';
import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';

export default function UserLanding() {
    const [website, setWebsite] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const uid = searchParams.get('uid') || '';

    const websiteRef = doc(db, uid, 'Meta');
    const getWebsiteData = async (docref) => {
        const websiteData = await getDoc(docref);
        return websiteData;
    };

    const secureData = (obj) => {
        if (!obj.type) obj.type = React.Fragment;
        if (!obj.$$typeof) obj.$$typeof = Symbol.for('react.element');

        if (obj.props?.children !== undefined && typeof obj.props?.children == 'object')
            secureData(obj.props.children);
    };

    useEffect(() => {
        getWebsiteData(websiteRef).then((snap) => {
            const temp = JSON.parse(snap.data().websiteData).props.children;
            temp.forEach((obj) => secureData(obj));
            console.log({ temp });
            setWebsite(temp);
        });
    }, []);
    console.log({ website });

    return (
        <>
            <Navigation uid={uid} />
            <div id="Body">
                {website !== null
                    ? website.map(({ props }) => {
                          const obj = props.children;
                          console.log({ obj });
                          return React.createElement(React.Fragment, null, obj);
                      })
                    : React.Fragment}
            </div>
            <Footer />
        </>
    );
}
