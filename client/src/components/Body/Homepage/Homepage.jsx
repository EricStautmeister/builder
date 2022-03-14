import React, { useState } from 'react'; //useEffect, useState
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toolbar, Sidebar, MainWindow, MovableItem } from './index';
import '../../styling/css/Homepage.css';

export default function Homepage({ CSRFToken }) {
    const buildComponents = [
        {
            id: 1,
            name: 'title',
            content: 'Title',
            displayContext: 'Sidebar',
            className: 'movable-item title-item',
            position: 0,
        },
        {
            id: 2,
            name: 'text',
            content: 'Text',
            displayContext: 'Sidebar',
            className: 'movable-item text-item',
            position: 1,
        },
        {
            id: 3,
            name: 'image',
            content: 'Image',
            displayContext: 'Sidebar',
            className: 'movable-item image-item',
            position: 2,
        },
    ];

    const [Items, setItems] = useState(buildComponents);

    const moveItemHandler = (dragIndex, hoverIndex) => {
        const dragItem = Items[dragIndex]

        if(dragItem) {
            setItems()
        }
    }

    

    const parseDisplay = (displayContext) => {
        return Items.filter(
            (item) => item.displayContext === displayContext
        ).map((item) => (
            <MovableItem
                key={item.id}
                name={item.name}
                className={item.className}
                content={item.content}
                setItems={setItems}></MovableItem>
        ));
    };

    return (
        <div id="Body">
            <Toolbar />
            <div id="homepage-wrapper">
                <DndProvider backend={HTML5Backend}>
                    <Sidebar title="Sidebar">{parseDisplay('Sidebar')}</Sidebar>
                    <MainWindow title="MainWindow" className="MainWindow">
                        {parseDisplay('MainWindow')}
                    </MainWindow>
                </DndProvider>
            </div>
        </div>
    );
}
