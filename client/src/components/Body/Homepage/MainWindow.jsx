import React, { useState } from 'react'; //useEffect, useState
import { useDrop } from 'react-dnd';

export default function MainWindow({ children, className, title }) {
    const [, drop] = useDrop({
        accept: 'SidebarComponent',
        drop: () => ({ name: title }),
    });

    return (
        <section id="homepage-view" ref={drop} className={className}>
            {children}
        </section>
    );
}
