import React, { useState } from 'react';
import "../../style/modal.css";

const CreateBrandModal = ({ entityToAdd, closeFunction }) => {

  const handleClose = () => {
    closeFunction();
  };

  return (
    <div className="modal-create">
        <div className="modal-header">{`NEW ${entityToAdd}`}</div>
        <div className="modal-button" >
            <button onClick={handleClose}>Close</button>
        </div>
    </div>
  );
};

export default CreateBrandModal;
