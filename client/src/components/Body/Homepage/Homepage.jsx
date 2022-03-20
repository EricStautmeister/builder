import React, { useState } from 'react'; //useEffect, useState
import { Toolbar, MovableItem } from './index';
import { MODES } from './constants';
import { buildComponents } from './BuildingBlocks';
import { Core, Edit } from './modes';
import '../../styling/css/Homepage.css';

export default function Homepage({ CSRFToken }) {
    const [Items, setItems] = useState(buildComponents);
    const [mode, setMode] = useState(MODES.CORE);

    const parseDisplay = (displayContext) => {
        return Items.filter(
            (item) => item.displayContext === displayContext
        ).map((item) => (
            <MovableItem
                key={item.id}
                data={item.data}
                position={item.position}
                className={item.className}
                setItems={setItems}
                onClick={() => console.log('Moooo')}></MovableItem>
        ));
    };

    const renderModeDependant = (mode) => {
        switch (mode) {
            case MODES.CORE:
                return (
                    <Core
                        parseDisplay={parseDisplay}
                        Items={Items}
                        setItems={setItems}
                    />
                );
            case MODES.EDIT:
                return <Edit parseDisplay={parseDisplay} />;
            default:
                return;
        }
    };

    return (
        <div id="Body">
            <div id="homepage-wrapper">
                <Toolbar mode={mode} setMode={setMode} />
                {renderModeDependant(mode)}
            </div>
        </div>
    );
}
