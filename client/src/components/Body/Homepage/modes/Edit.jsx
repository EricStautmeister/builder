import React from 'react'; //useEffect, useState
import { WINDOWS } from '../constants';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MainWindow } from '../index';

export default function Edit({ parseDisplay }) {
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
}
