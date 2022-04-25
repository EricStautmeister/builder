import React from 'react'; //useEffect, useState
import { WINDOWS } from '../constants';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sidebar, MainWindow } from '../index';
import { ItemTypes } from '../constants';
import { useDrag, useDrop } from 'react-dnd';

export default function Core({ parseDisplay, Items, setItems }) {
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
                    <MainWindow title={WINDOWS.MAINWINDOW} className={WINDOWS.MAINWINDOW}>
                        {parseDisplay(WINDOWS.MAINWINDOW)}
                    </MainWindow>
                </DndProvider>
            </div>
        </>
    );
}
