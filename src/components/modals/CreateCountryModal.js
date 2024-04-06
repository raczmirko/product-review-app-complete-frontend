import React, { useState } from 'react';
import "../../style/modal.css";
import "../../style/styles.css";

const CreateCountryModal = ({ entityToAdd, closeFunction, createCountryFunction }) => {
    const [countryCode, setCountryCode] = useState('');
    const [name, setName] = useState('');

    const handleClose = (e) => {
        e.preventDefault();
        closeFunction();
    }

    const handleCreate = (e) => {
        createCountryFunction(countryCode, name);
        closeFunction();
    }

    return (
        <div className="modal-create">
            <form onSubmit={handleCreate}>
                <div className="page-header">{`NEW ${entityToAdd}`}</div>
                <div className="form-group">
                    <label>Country Code:</label>
                    <input type="text" value={name} onChange={(e) => setCountryCode(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="modal-buttons" >
                    <button type="submit" className="button-confirm">Create</button>
                    <button className="button-cancel" onClick={(e) => handleClose(e)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCountryModal;
