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
            className: 'movable-item title-item',
            position: 0,
        },
        {
            id: 2,
            name: 'text',
            content:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam hic dolore perspiciatis repellendus voluptatibus architecto quam animi, ex reprehenderit laboriosam harum aliquam cum officiis asperiores, consequuntur nostrum, possimus veritatis distinctio.',
            column: 'Sidebar',
            displayContext: 'Sidebar',
            className: 'movable-item text-item',
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
                className={item.className}
                content={item.content}
                setItems={setItems}></MovableItem>
        ));
    };

    return (
        <div id="Body">
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
