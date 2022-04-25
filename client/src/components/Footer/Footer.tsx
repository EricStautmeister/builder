import React from 'react';
import { Icon, Image } from '../GLOBAL';
import { GithubIcon, FacebookIcon, YoutubeIcon, InstagramIcon, TwitterIcon } from 'react-ejist-lib';

import '../styling/css/Footer.css';
import firebaseLight from '../styling/media/FirebaseLight.svg';
import firebaseDark from '../styling/media/FirebaseDark.svg';

function Footer() {
    return (
        <footer>
            <div className="links"></div>
            <div className="socials">
                <h3>Socials</h3>
                <div className="iconWrapper">
                    <FacebookIcon href="http://facebook.com" />
                    <YoutubeIcon href="http://youtube.com" />
                    <GithubIcon href="http://github.com/EricStautmeister" />
                    <InstagramIcon href="http://instagram.com" />
                    <TwitterIcon href="http://twitter.com" />
                </div>
            </div>
            <div className="refrences">
                <Image src={firebaseLight} href="https://firebase.google.com/" />
            </div>
        </footer>
    );
}

export default React.memo(Footer);
