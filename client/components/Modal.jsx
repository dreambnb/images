import React from 'react';
import styles from '../styles/style.css';

const Modal = ({isOpen, children}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div id="modal" className={styles.modal}>
      {children}
    </div>
  );    
};

export default Modal;
