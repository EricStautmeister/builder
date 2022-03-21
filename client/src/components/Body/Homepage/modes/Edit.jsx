import React, { useState } from 'react'; //useEffect, useState
import { WINDOWS } from '../constants';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MainWindow } from '../index';
import Modal from './Modal';

export default function Edit({ parseDisplay, modal, modalData }) {
    return (
        <>
            <div id="homepage-edit">
                {modal === true ? (
                    <Modal className="active" data={modalData} modal={modal} />
                ) : (
                    <Modal
                        className="inactive"
                        data={modalData}
                        modal={modal}
                    />
                )}
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
