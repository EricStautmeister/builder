import React, { useEffect, useState } from 'react'; //useEffect, useState
import { useDrop } from 'react-dnd';
import { ItemTypes, WINDOWS } from './constants';

export default function Sidebar({ children, className, title }) {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.CORE,
        drop: () => ({ name: title }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <section id={WINDOWS.SIDEBAR} ref={drop} className={className}>
            {children}
        </section>
    );
}
