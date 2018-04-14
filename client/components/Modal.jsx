import React from 'react';
import styles from '../styles/style.css';

const Modal = (props) => {
  if (!props.isOpen) {
    return null;
  }
  return (
    <div id="modal" className={styles.modal} onClick={(e) => props.closeModal(e)}>
      {props.children}
    </div>
  );    
};

export default Modal;
