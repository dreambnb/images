import React from 'react';

import styles from '../styles/style.css';
import arrowRight from '../icons/arrow-right.png';
import arrowLeft from '../icons/arrow-left.png';

const LightBox = ({images, curImageIndex, closeModal, changeIndex}) => {
  let curImage = images[curImageIndex];

  let onModalClick = (e) => {
    let backdrop = document.getElementById('backdrop');
    if (e.target === backdrop) {
      closeModal();
    }
  }

  return (
    <div id="backdrop" className={styles['lightbox-container']} onClick={(e) => onModalClick(e)}>
      <img src={curImage.src} className={styles['display-image']} align="middle"/>
    </div>
  );
}

export default LightBox;