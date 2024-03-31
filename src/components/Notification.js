import React, { useState } from 'react';
import '../style/notification.css';

const Notification = ({ type, title, text, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`notification ${type}`}>
        <div className="notification-title">
            {title}
        </div>
        <hr/>
        <div>
            {text}
        </div>
        <hr/>
        <div className="notification-button" >
            <button onClick={handleClose}>Close</button>
        </div>
    </div>
  );
};

export default Notification;
