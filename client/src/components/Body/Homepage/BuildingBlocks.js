import { WINDOWS } from './constants';

export const buildComponents = [
    {
        id: 1,
        data: {
            name: 'title',
            content: 'Title',
        },
        position: {
            left: 0,
            right: 0,
        },
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item title-item',
    },
    {
        id: 2,
        data: {
            name: 'text',
            content: 'Text',
        },
        position: {
            left: 0,
            right: 0,
        },
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item text-item',
    },
    {
        id: 3,
        data: {
            name: 'image',
            content: 'Image',
        },
        position: {
            left: 0,
            right: 0,
        },
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item image-item',
    },
];
