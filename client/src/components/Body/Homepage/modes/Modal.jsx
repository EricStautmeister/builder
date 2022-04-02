import React, { useState, useEffect } from 'react';

export default function Modal({ className, data, modal, setModal, Items, setItems }) {
    const [itemContent, setContent] = useState();
    /**
     * It sets the value of the itemContent variable to the value of the input field and then updates
     * the items array with the new value.
     * @param e - The event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setItems(
            Items.map((Item) => {
                if (Item.data.name === data.name) {
                    return {
                        ...Item,
                        data: {
                            ...Item.data,
                            content: itemContent,
                        },
                    };
                }
                return Item;
            })
        );
        setModal(false);
    };

    if (modal) {
        return (
            <React.Fragment>
                <div id="edit-modal">
                    <div id="Anchor" className={className}>
                        <form id="modalForm" className="modalForm" onSubmit={handleSubmit}>
                            <p className="modalInfo">
                                Current Item Data: <strong>{data.content}</strong>
                            </p>

                            <input
                                type="text"
                                name="modalInput"
                                className="modalInput"
                                id="item"
                                placeholder="New Value"
                                onChange={({ target }) => setContent(target.value)}
                            />
                            <div className="button">
                                <button type="submit" className="btn" form="modalForm">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <>
                <div id="edit-modal">
                    <div className={className}></div>
                </div>
            </>
        );
    }
}
