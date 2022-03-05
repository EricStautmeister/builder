import React, { useState } from 'react'; //useEffect, useState
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sidebar, MainWindow, MovableItem } from './Homepage/index';
import '../styling/css/Homepage.css';

export default function Homepage({ CSRFToken }) {
    const buildComponents = [
        {
            id: 1,
            name: 'title',
            content: 'Title',
            column: 'Sidebar',
            displayContext: 'Sidebar',
            position: 0,
        },
        {
            id: 2,
            name: 'text',
            content: 'Text',
            column: 'Sidebar',
            displayContext: 'Sidebar',
            position: 1,
        },
    ];
    const [Items, setItems] = useState(buildComponents);

    const parseDisplay = (displayContext) => {
        return Items.filter(
            (item) => item.displayContext === displayContext
        ).map((item) => (
            <MovableItem
                key={item.id}
                name={item.name}
                className="movable-item"
                setItems={setItems}></MovableItem>
        ));
    };

    return (
        <div id="Body">
            <div id="homepage-wrapper">
                <DndProvider backend={HTML5Backend}>
                    <Sidebar title="Sidebar">
                        {parseDisplay('Sidebar')}
                    </Sidebar>
                    <MainWindow title="MainWindow">
                        {parseDisplay('MainWindow')}
                    </MainWindow>
                </DndProvider>
            </div>
        </div>
    );
}
