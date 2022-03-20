import React, { useState } from 'react'; //useEffect, useState
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toolbar, Sidebar, MainWindow, MovableItem } from './index';
import { WINDOWS, MODES } from './constants';
import { buildComponents } from './BuildingBlocks';
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
                onClick={() => console.log("Moooo")}></MovableItem>
        ));
    };

    const renderModeDependant = (mode) => {
        switch (mode) {
            case MODES.CORE:
                return (
                    <>
                        <div id="homepage-setup">
                            <DndProvider backend={HTML5Backend}>
                                <Sidebar
                                    title={WINDOWS.SIDEBAR}
                                    className={WINDOWS.SIDEBAR}
                                    items={Items}
                                    setItems={setItems}>
                                    {parseDisplay(WINDOWS.SIDEBAR)}
                                </Sidebar>
                                <MainWindow
                                    title={WINDOWS.MAINWINDOW}
                                    className={WINDOWS.MAINWINDOW}>
                                    {parseDisplay(WINDOWS.MAINWINDOW)}
                                </MainWindow>
                            </DndProvider>
                        </div>
                    </>
                );

            case MODES.POSITIONING:
                return (
                    <>
                        <div id="homepage-positioning">
                            <DndProvider backend={HTML5Backend}>
                                <MainWindow
                                    title={WINDOWS.MAINWINDOW}
                                    className={WINDOWS.MAINWINDOW}>
                                    {parseDisplay(WINDOWS.MAINWINDOW)}
                                </MainWindow>
                            </DndProvider>
                        </div>
                    </>
                );
            case MODES.EDIT:
                return (
                    <>
                        <div id="homepage-edit">
                            <DndProvider backend={HTML5Backend}>
                                <MainWindow
                                    title={WINDOWS.MAINWINDOW}
                                    className={WINDOWS.MAINWINDOW}>
                                    {parseDisplay(WINDOWS.MAINWINDOW)}
                                </MainWindow>
                            </DndProvider>
                        </div>
                    </>
                );
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
