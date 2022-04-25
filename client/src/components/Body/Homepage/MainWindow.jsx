import React, { useState } from 'react'; //useEffect, useState
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './constants';

export default function MainWindow({
    children,
    className,
    title,
    items,
    setItems,
}) {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.CORE,
        drop: () => ({ name: title }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <section id="homepage-view" ref={drop} className={className}>
            {children}
        </section>
    );
}
