import React, { useState } from 'react';
import { CgTrash, CgCheckO, CgClose } from "react-icons/cg";
import "../style/cards.css"; // You may need to create this CSS file for styling

const DynamicCards = ({ data, deleteFunction }) => {
    const [confirmDeleteRowId, setConfirmDeleteRowId] = useState(null);

    if (!data || data.length === 0) {
        return <p>No data available.</p>;
    }

    const handleDelete = id => {
        deleteFunction(id);
        const updatedData = data.filter(item => item.id !== id);
    };

    const showConfirmDelete = (rowId) => {
        setConfirmDeleteRowId(rowId);
    };

    const cancelDelete = () => {
        setConfirmDeleteRowId(null);
    };

    return (
        <div className="cards-container">
            {data.map((row, index) => (
                <div key={index} className="card">
                    {Object.entries(row).map(([key, value]) => (
                        <div key={key} className="card-field">
                            <span className="field-name">{key}: </span>
                            <span className="field-value">{value}</span>
                            <hr/>
                        </div>
                    ))}
                    <div className="action-card-cell">
                        {confirmDeleteRowId === row.id ? (
                            <>
                                <button className="button-confirm" onClick={() => handleDelete(row.id)}><CgCheckO  /></button>
                                <button className="button-delete" onClick={cancelDelete}><CgClose /></button>
                            </>
                        ) : (
                            <button className="button-delete" onClick={() => showConfirmDelete(row.id)}><CgTrash /></button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DynamicCards;
