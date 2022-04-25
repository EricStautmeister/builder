import React, { useState } from 'react'; //useEffect, useState
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './constants';

type Props = {
    children?: any;
    className?: string;
    title?: string;
    items?: any;
    setItems?: any;
};
export default function MainWindow({
    children,
    className,
    title,
    items,
    setItems,
}: Props): JSX.Element {
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
