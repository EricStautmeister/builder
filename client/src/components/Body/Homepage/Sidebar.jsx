import React, { useState } from 'react'; //useEffect, useState
import { useDrop } from 'react-dnd';
import { ItemTypes } from './constants';

export default function Sidebar({ children, className, title }) {
    const [, drop] = useDrop({
        accept: 'SidebarComponent',
        drop: () => ({ name: title }),
    });

    return (
        <section id="sidebar" ref={drop} className={className}>
            {children}
        </section>
    );
}
