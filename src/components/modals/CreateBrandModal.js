import React, { useState } from 'react';
import CountrySelector from "../CountrySelector";
import "../../style/modal.css";
import "../../style/styles.css";

const CreateBrandModal = ({ entityToAdd, closeFunction, createBrandFunction }) => {
    const [name, setName] = useState('');
    const [country, setCountry] = useState({});
    const [description, setDescription] = useState('');

    const handleCountrySelect = () => {

    }

    const handleClose = () => {
        closeFunction();
    }

    return (
        <div className="modal-create">
            <div className="page-header">{`NEW ${entityToAdd}`}</div>
            <div className="form-group">
                <label>Username:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Country:</label>
                <CountrySelector onSelect={handleCountrySelect} />
            </div>
            <div className="form-group textarea-container">
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </div>
            <div className="modal-buttons" >
                <button className="button-confirm" onClick={handleClose}>Create</button>
                <button className="button-cancel" onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
};

export default CreateBrandModal;
