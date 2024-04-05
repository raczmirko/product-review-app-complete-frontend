import React, { useState } from 'react';
import { CgTrash, CgCheckO, CgClose, CgCompressLeft, CgArrowsExpandLeft } from "react-icons/cg";
import "../style/cards.css";

const DynamicCards = ({ data, deleteFunction }) => {
    const [confirmDeleteRowId, setConfirmDeleteRowId] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);
    const [truncatedCardIds, setTruncatedCardIds] = useState([]);

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

    const toggleCardExpand = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const truncateText = (rowId, text, limit) => {
        if (typeof text !== 'string') return text; // Check if text is a string
        if (text.length <= limit) return text;
        if (!truncatedCardIds.includes(rowId)) {
            setTruncatedCardIds(prevIds => [...prevIds, rowId]);
        }
        return text.slice(0, limit) + '...';
    };

    return (
        <div className="cards-container">
            {data.map((row, index) => (
                <div key={index} className={`card ${expandedCard === row.id ? 'expanded' : ''}`}>
                    {Object.entries(row).map(([key, value]) => (
                        <div key={key} className="card-field">
                            <span className="field-name">{key}: </span>
                            <span className="field-value">
                                {expandedCard === row.id ? value : truncateText(row.id, value, 50)}
                            </span>
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
                        {
                            truncatedCardIds.includes(row.id) &&
                            <button className="button-expand" onClick={() => toggleCardExpand(row.id)}>
                                {expandedCard === row.id ? <CgCompressLeft/> : <CgArrowsExpandLeft/>}
                            </button>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DynamicCards;