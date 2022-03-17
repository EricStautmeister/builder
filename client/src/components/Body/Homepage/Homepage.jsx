import React, { useState } from 'react'; //useEffect, useState
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toolbar, Sidebar, MainWindow, MovableItem } from './index';
import { buildComponents } from './BuildingBlocks';
import '../../styling/css/Homepage.css';

export default function Homepage({ CSRFToken }) {
    const [Items, setItems] = useState(buildComponents);

    const moveItemHandler = (dragIndex, hoverIndex) => {
        const dragItem = Items[dragIndex];

        if (dragItem) {
            setItems((previousState) => {
                const coppiedStateArray = [...previousState];
                const previousItem = coppiedStateArray.slice(
                    hoverIndex,
                    1,
                    dragItem
                );
                coppiedStateArray.splice(dragIndex, previousItem);
                return coppiedStateArray;
            });
        }
    };

    const parseDisplay = (displayContext) => {
        return Items.filter(
            (item) => item.displayContext === displayContext
        ).map((item, index) => (
            <MovableItem
                key={item.id}
                index={index}
                data={item.data}
                className={item.className}
                setItems={setItems}
                moveItemHandler={moveItemHandler}></MovableItem>
        ));
    };

    return (
        <div id="Body">
            <div id="homepage-wrapper">
                <Toolbar />
                <div id="homepage-builder">
                    <DndProvider backend={HTML5Backend}>
                        <Sidebar title="Sidebar">
                            {parseDisplay('Sidebar')}
                        </Sidebar>
                        <MainWindow title="MainWindow" className="MainWindow">
                            {parseDisplay('MainWindow')}
                        </MainWindow>
                    </DndProvider>
                </div>
            </div>
        </div>
    );
}
