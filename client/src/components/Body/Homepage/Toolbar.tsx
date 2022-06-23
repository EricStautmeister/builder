import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MODES } from './constants';
import { Save } from './modes';

type Props = {
    Items: any;
    mode: string;
    setMode: any;
};

export default function Toolbar({ Items, mode, setMode }: Props): JSX.Element {
    const parseMode = (option: string) => {
        if (option === mode) return;
        setMode(option);
    };
    return (
        <div className="toolbar">
            <div className="toolbar-buttons">
                <p>Options:</p>
                <div className="button">
                    <button className="btn" onClick={() => parseMode(MODES.CORE)}>
                        -Set Up-
                    </button>
                </div>
                <div className="button">
                    <button className="btn" onClick={() => parseMode(MODES.EDIT)}>
                        -Edit Items-
                    </button>
                </div>
                <Save Items={Items} />
            </div>
            <div className="toolbar-infos">
                <div className="info-wrapper">
                    <p>Current Mode:</p>
                    <strong className="info">{mode}</strong>
                </div>
            </div>
        </div>
    );
}
