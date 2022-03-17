import { WINDOWS } from './constants';

export const buildComponents = [
    {
        id: 1,
        data: {
            name: 'title',
            content: 'Title',
        },
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item title-item',
    },
    {
        id: 2,
        name: 'text',
        content: 'Text',
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item text-item',
    },
    {
        id: 3,
        name: 'image',
        content: 'Image',
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item image-item',
    },
];
