import React, { useState, useEffect } from 'react';
import { LoggedIn, NotLoggedIn } from '../src/application-states';

export default function SubdomainHandler({ CSRFToken, isLoggedIn }) {
    const [apps, setApps] = useState([
        {
            name: 'Not Logged In',
            subdomain: null,
            app: function () {
                return <NotLoggedIn CSRFToken={CSRFToken} />;
            },
            base: true,
        },
        {
            name: 'Logged In',
            subdomain: 'admin',
            app: function () {
                return <LoggedIn CSRFToken={CSRFToken} />;
            },
        },
    ]);

    const urlParts = window.location.hostname.split('.');

    const isLocalhost = urlParts[urlParts.length - 1] === 'localhost';
    let rootDomain = isLocalhost ? -3 : -1;
    const subdomain = urlParts.slice(0, rootDomain).join('.');

    const base = apps.find((app) => app.base);
    if (!base) {
        throw new Error('You need a base app with no subdomain');
    }
    if (!subdomain) {
        return base.app();
    }
    const sub = apps.find((app) => app.subdomain === subdomain);
    if (sub) {
        if (isLoggedIn && sub.subdomain === 'admin') {
            return sub.app();
        }
        return sub.app();
    } else {
        return base.app();
    }
}
