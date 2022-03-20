import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MODES } from './constants';

export default function Toolbar({ mode, setMode }) {
    const parseMode = (option) => {
        if (option === mode) return;
        setMode(option);
    };
    return (
        <div className="toolbar">
            <div className="toolbar-buttons">
                <p>Options:</p>
                <div className="button">
                    <button
                        className="btn"
                        onClick={() => parseMode(MODES.CORE)}>
                        -Set Up-
                    </button>
                </div>
                <div className="button">
                    <button
                        className="btn"
                        onClick={() => parseMode(MODES.EDIT)}>
                        -Edit Items-
                    </button>
                </div>
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
