import React from 'react';

import '../css/Footer.css';
import facebookIcon from '../media/facebook.png';
import twitterIcon from '../media/twitter.png';
import instagramIcon from '../media/instagram.png';
import githubIcon from '../media/github.png';
import youtubeIcon from '../media/youtube.png';

export default function Footer() {
    return (
        <div id="Footer">
            <div className="iconWrapper">
                <a className="icon facebook" href="http://facebook.com">
                    <span>
                        <img src={facebookIcon} alt="" className="icon" />
                    </span>
                </a>
                <a className="icon twitter" href="http://twitter.com">
                    <span>
                        <img src={twitterIcon} alt="" className="icon" />
                    </span>
                </a>
                <a className="icon instagram" href="http://instagram.com">
                    <span>
                        <img src={instagramIcon} alt="" className="icon" />
                    </span>
                </a>
                <a
                    className="icon github"
                    href="http://github.com/EricStautmeister">
                    <span>
                        <img src={githubIcon} alt="" className="icon" />
                    </span>
                </a>
                <a className="icon youtube" href="http://youtube.com">
                    <span>
                        <img src={youtubeIcon} alt="" className="icon" />
                    </span>
                </a>
            </div>
        </div>
    );
}
