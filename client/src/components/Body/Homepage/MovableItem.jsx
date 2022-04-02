import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes, WINDOWS } from './constants';
import '../../styling/css/MovableComponent.css';

export default function MovableItem({ Item, setItems, onClick }) {
    const data = Item.data;
    const position = Item.position;

    /**
     * Given a current item and a display context, change the display context of the current item to
     * the display context
     * @param currentItem - The item that is currently being dragged.
     * @param displayContext - The display context of the item.
     */
    const changePosition = (currentItem, displayContext) => {
        setItems((previousState) => {
            return previousState.map((previousItem) => {
                return {
                    ...previousItem,
                    displayContext:
                        previousItem.data.name === currentItem.name
                            ? displayContext
                            : previousItem.displayContext,
                };
            });
        });
    };

    /* This is the code that allows the item to be dragged. The `useDrag` hook is used to create a
    draggable component. The `item` property is the item that is being dragged. The `type` property
    is the type of item that is being dragged. The `end` property is the function that is called
    when the item is dropped. The `collect` property is the function that is called when the item is
    being dragged. */
    const [{ isDragging }, drag] = useDrag({
        item: { name: data.name, left: position.left, top: position.top },
        type: ItemTypes.CORE,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log();
            if (dropResult && dropResult.name === WINDOWS.MAINWINDOW) {
                changePosition(item, WINDOWS.MAINWINDOW);
            } else {
                changePosition(item, WINDOWS.SIDEBAR);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.6 : 1;

    
    const options = {
        ref: drag,
        style: { opacity },
        onClick: () => onClick({ data, displayContext: Item.displayContext }),
    };

    return <>{Item.jsx(options.ref, options.style, options.onClick)}</>;
}
