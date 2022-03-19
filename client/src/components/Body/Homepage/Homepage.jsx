import React, { useState } from 'react'; //useEffect, useState
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toolbar, Sidebar, MainWindow, MovableItem } from './index';
import { WINDOWS } from './constants';
import { buildComponents } from './BuildingBlocks';
import '../../styling/css/Homepage.css';

export default function Homepage({ CSRFToken }) {
    const [Items, setItems] = useState(buildComponents);

    const parseDisplay = (displayContext) => {
        return Items.filter(
            (item) => item.displayContext === displayContext
        ).map((item) => (
            <MovableItem
                key={item.id}
                data={item.data}
                position={item.position}
                className={item.className}
                setItems={setItems}></MovableItem>
        ));
    };

    return (
        <div id="Body">
            <div id="homepage-wrapper">
                <Toolbar />
                <div id="homepage-builder">
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
            </div>
        </div>
    );
}
