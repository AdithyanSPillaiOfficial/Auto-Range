// Modal.js
import React from 'react';
import './Popup.css'; // For styling the modal

const Popup = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={closeModal}>Close X</button>
      </div>
    </div>
  );
};

export default Popup;
