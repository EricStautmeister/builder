import React, { useState, useEffect } from 'react';

export default function Modal({ className, data, modal }) {
    const [itemContent, setContent] = useState();
    const handleSubmit = () => {
        //TODO: Bubble the value of ItemContent up to the item array
        return;
    };

    if (modal) {
        return (
            <React.Fragment>
                <div id="edit-modal">
                    <div id="Anchor" className={className}>
                        <form
                            id="modalForm"
                            className="modalForm"
                            onSubmit={handleSubmit}>
                            <p className="modalInfo">
                                Current Item Data:{' '}
                                <strong>{data.content}</strong>
                            </p>

                            <input
                                type="text"
                                name="modalInput"
                                className="modalInput"
                                id="item"
                                placeholder="New Value"
                                onChange={({ target }) =>
                                    setContent(target.value)
                                }
                            />
                            <div className="button">
                                <button
                                    type="submit"
                                    className="btn"
                                    form="modalForm">
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
