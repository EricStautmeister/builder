import React from 'react'; //useEffect, useState

import './css/Profile.css';

export default function Profile({ CSRFToken, user }) {
    const email = user.user.email;
    const displayName = user.user.displayName;
    const phoneNumber = user.user.phoneNumber;
    // const email = JSON.stringify(user.email);

    const displayData = (value) => {
        if (value === null) return 'Empty';
        return value;
    };

    return (
        <div id="Body">
            <div id="body-container">
                <div id="settings-wrapper">
                    <div className="settings-labels">
                        <ul>
                            <li>Username:</li>
                            <br />
                            <li>Email:</li>
                            <br />
                            <li>Phonenumber:</li>
                        </ul>
                    </div>
                    <div className="settings-inputs">
                        <ul>
                            <input
                                className="settings"
                                type="text"
                                placeholder={displayData(displayName)}
                            />
                            <br />
                            <input
                                className="settings"
                                type="text"
                                placeholder={displayData(email)}
                            />
                            <br />
                            <input
                                className="settings"
                                type="text"
                                placeholder={displayData(phoneNumber)}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
