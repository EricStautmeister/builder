import React, { useState } from 'react'; //useEffect, useState
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../fire.js';

import '../styling/css/Profile.css';

export default function Profile({ CSRFToken }, props) {
    const user = useSelector((state) => state.user);

    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const displayData = (value) => {
        if (value === null || '' || undefined) return 'Empty';
        return value;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ e });
        console.log({ displayName, email, phoneNumber });
    };

    return (
        <div id="Body">
            <div id="body-container">
                <form
                    id="settingsForm"
                    className="form"
                    onSubmit={handleSubmit}>
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
                                    onChange={({ target }) =>
                                        setDisplayName(target.value)
                                    }
                                    placeholder={displayData(user.displayName)}
                                />
                                <br />
                                <input
                                    className="settings"
                                    type="text"
                                    onChange={({ target }) =>
                                        setEmail(target.value)
                                    }
                                    placeholder={displayData(user.email)}
                                />
                                <br />
                                <input
                                    className="settings"
                                    type="text"
                                    onChange={({ target }) =>
                                        setPhoneNumber(target.value)
                                    }
                                    placeholder={displayData(user.phoneNumber)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            form="settingsForm">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
