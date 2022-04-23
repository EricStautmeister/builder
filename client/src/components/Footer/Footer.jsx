import React from 'react';
import { Icon, Image } from '../GLOBAL';

import '../styling/css/Footer.css';
import facebookIcon from '../styling/media/facebook.png';
import twitterIcon from '../styling/media/twitter.png';
import instagramIcon from '../styling/media/instagram.png';
import githubIcon from '../styling/media/github.png';
import youtubeIcon from '../styling/media/youtube.png';
import firebaseLight from '../styling/media/FirebaseLight.svg';
import firebaseDark from '../styling/media/FirebaseDark.svg';

function Footer() {
    return (
        <footer>
            <div className="links"></div>
            <div className="socials">
                <h3>Socials</h3>
                <div className="iconWrapper">
                    <Icon
                        src={facebookIcon}
                        width={'50px'}
                        height={'50px'}
                        href="http://facebook.com"
                    />
                    <Icon
                        src={twitterIcon}
                        width={'50px'}
                        height={'50px'}
                        href="http://twitter.com"
                    />
                    <Icon
                        src={instagramIcon}
                        width={'50px'}
                        height={'50px'}
                        href="http://instagram.com"
                    />
                    <Icon
                        src={githubIcon}
                        width={'50px'}
                        height={'50px'}
                        href="http://github.com/EricStautmeister"
                    />
                    <Icon
                        src={youtubeIcon}
                        width={'50px'}
                        height={'50px'}
                        href="http://youtube.com"
                    />
                </div>
            </div>
            <div className="refrences">
                <Image src={firebaseLight} href="https://firebase.google.com/" />
                <a className="firebase" href="https://firebase.google.com/">
                    <span>
                        <img src={firebaseLight} alt="" className="" />
                    </span>
                </a>
            </div>
        </footer>
    );
}

export default React.memo(Footer);
