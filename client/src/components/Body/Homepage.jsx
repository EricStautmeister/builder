import React, { useState } from 'react'; //useEffect, useState
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MovableComponent from './MovableComponent';
import '../styling/css/Homepage.css';

export default function Homepage({ CSRFToken }) {
    const buildComponents = [
        {
            id: 'title',
            content: 'Title',
        },
        {
            id: 'text',
            content: 'Text',
        },
    ];
    const [components, updateComponents] = useState(buildComponents);
    function handleOnDragEnd(result) {
        const items = Array.from(components);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateComponents(items);
    }
    return (
        <div id="Body">
            <div id="homepage-wrapper">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div id="sidebar"></div>
                    <section id="homepage-view">
                        <Droppable droppableId="movable">
                            {(provided) => (
                                <div
                                    id="homepage-window"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {components.map(
                                        ({ id, content }, index) => {
                                            return (
                                                <Draggable
                                                    key={id}
                                                    draggableId={id}
                                                    index={index}>
                                                    {(provided) => (
                                                        <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={
                                                                provided.innerRef
                                                            }>
                                                            <MovableComponent
                                                                className="movable"
                                                                content={
                                                                    content
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </section>
                </DragDropContext>
            </div>
        </div>
    );
}
