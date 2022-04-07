import React, { useState } from 'react'; //useEffect, useState
import { Toolbar, MovableItem } from './index';
import { MODES } from './constants';
import { buildComponents } from './BuildingBlocks';
import { Core, Edit } from './modes';
import '../../styling/css/Homepage.css';
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import { WINDOWS } from './constants';

export default function Homepage() {
    const [Items, setItems] = useState(buildComponents);
    const [mode, setMode] = useState(MODES.CORE);
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState();

    /**
     * * If the display context is the main window and the mode is edit, then if the modal is false,
     * set the modal data to the data passed in. Then set the modal to true
     * @param toggleData - The data that is passed to the toggle function.
     * @returns The `toggle` function returns a `boolean` value. This is used to determine whether or
     * not the modal should be displayed.
     */
    const toggle = (toggleData) => {
        if (toggleData.displayContext === WINDOWS.MAINWINDOW && mode === MODES.EDIT) {
            if (modal === false) setModalData(toggleData.data);
            setModal(!modal);
            return;
        }
    };

    /**
     * Given a display context, return a list of movable items
     * @param displayContext - The context in which the item is being displayed.
     * @returns The `parseDisplay` function returns an array of `MovableItem` components.
     */
    const parseDisplay = (displayContext) => {
        return Items.filter((item) => item.displayContext === displayContext).map((item) => (
            <MovableItem
                key={item.id}
                Item={item}
                setItems={setItems}
                onClick={toggle}></MovableItem>
        ));
    };

    /**
     * This function renders the core component if the mode is core, otherwise it renders the edit
     * component
     * @param mode - The current mode of the application.
     * @returns The renderModeDependant function is being called with the current mode.
     */
    const renderModeDependant = (mode) => {
        switch (mode) {
            case MODES.CORE:
                return <Core parseDisplay={parseDisplay} Items={Items} setItems={setItems} />;
            case MODES.EDIT:
                return (
                    <Edit
                        parseDisplay={parseDisplay}
                        Items={Items}
                        setItems={setItems}
                        modal={modal}
                        modalData={modalData}
                        setModal={setModal}
                    />
                );
            default:
                return;
        }
    };

    return (
        <>
            <Header />
            <main>
                <div id="Body">
                    <div id="homepage-wrapper">
                        <Toolbar Items={Items} mode={mode} setMode={setMode} />
                        {renderModeDependant(mode)}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
