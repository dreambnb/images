import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import style from '../styles/modal-style.css';

const Modal = ({isOpen, children}) => {
  
  const transitions = {
    enter: style['fade-enter'],
    enterActive: style['fade-enter-active'],
    exit: style['fade-exit'],
    exitActive: style['fade-exit-active']
  }
  return (
    <div>
      <TransitionGroup>
        <CSSTransition classNames={transitions} timeout={250} key={isOpen}>
          {isOpen ? 
            <div id="modal" className={style['modal-wrapper']}>
              {children}
            </div>
            : <div></div>
          }
        </CSSTransition>
      </TransitionGroup>
    </div>
  );    
};

export default Modal;
