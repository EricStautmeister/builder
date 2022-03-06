import React from 'react';
import { useDrag } from 'react-dnd';
import '../../styling/css/MovableComponent.css';

export default function MovableItem({ className, name, content, setItems }) {
    const changePosition = (currentItem, displayContext) => {
        setItems((previousState) => {
            console.log(console.log({ className, name, setItems, previousState, currentItem, displayContext }));
            return previousState.map((previousItem) => {
                return {
                    ...previousItem,
                    displayContext:
                        previousItem.name === currentItem.name
                            ? displayContext
                            : previousItem.displayContext,
                };
            });
        });
    };
    const [{ isDragging }, drag] = useDrag({
        item: { name },
        type: 'SidebarComponent',
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && dropResult.name === 'MainWindow') {
                changePosition(item, 'MainWindow');
            } else {
                changePosition(item, 'Sidebar');
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    const opacity = isDragging ? 0.6 : 1;

    return (
        <div ref={drag} className={className} style={{ opacity }}>
            {content}
        </div>
    );
}
