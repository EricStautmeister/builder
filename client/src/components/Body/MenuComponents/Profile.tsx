import React, { useState } from 'react'; //useEffect, useState
import { useSelector } from 'react-redux';
import { setUser } from '../../../actions';
import { auth } from '../../../fire.js';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

import '../../styling/css/Profile.css';

function Profile(props: any) {
    //TODO: Needs submittability
    //TODO: Password Change
    //TODO: Email Verification
    //TODO: User deletion
    //TODO: reauthentification on deletion
    const user = useSelector((state: any) => state.user);

    const [displayName, setDisplayName] = useState<any | null>();
    const [email, setEmail] = useState<any | null>();
    const [phoneNumber, setPhoneNumber] = useState<any | null>();

    const displayData = (value: any) => {
        if (value === null || '' || undefined) return 'None';
        return value;
    };

    const handleSubmit = (event: any): void => {
        event.preventDefault();
        console.log({ event });
        console.log({ displayName, email, phoneNumber });
    };

    return (
        <>
            <Header />
            <main>
                <div id="Body">
                    <div id="body-container">
                        <form id="settingsForm" className="form" onSubmit={handleSubmit}>
                            <div id="settings-wrapper">
                                <div id="data">
                                    <div className="settings-labels">
                                        <p>Username:</p>
                                        <br />
                                        <p>Email:</p>
                                        <br />
                                        <p>Phonenumber:</p>
                                    </div>
                                    <div className="settings-inputs">
                                        <input
                                            className="settings"
                                            type="text"
                                            onChange={({ target }) => setDisplayName(target.value)}
                                            placeholder={displayData(user.displayName)}
                                        />
                                        <br />
                                        <input
                                            className="settings"
                                            type="text"
                                            onChange={({ target }) => setEmail(target.value)}
                                            placeholder={displayData(user.email)}
                                        />
                                        <br />
                                        <input
                                            className="settings"
                                            type="text"
                                            onChange={({ target }) => setPhoneNumber(target.value)}
                                            placeholder={displayData(user.phoneNumber)}
                                        />
                                    </div>
                                </div>
                                <div className="button">
                                    <button type="submit" className="btn" form="settingsForm">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default React.memo(Profile);
