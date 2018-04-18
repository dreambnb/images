import React from 'react';

import Carousel from './Carousel.jsx';

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
  };
  
  console.log(images.length);
  return (
    <div id="backdrop" className={styles['lightbox-container']} onClick={(e) => onModalClick(e)}>
      <button id="prev" className={styles['nav-left']} onClick={() => changeIndex(--curImageIndex)}>
        <img className={styles['nav-icon']} src={arrowLeft} style={{left: 0}}/>
      </button>
      <img src={curImage.src} className={styles['display-image']} align="middle" onClick={() => changeIndex(++curImageIndex)}/>
      <button id="next" className={styles['nav-right']} onClick={() => changeIndex(++curImageIndex)}>
        <img className={styles['nav-icon']} src={arrowRight} style={{right: 0}}/>
      </button>
      <div id="lightbox-bottom" className={styles['lightbox-bottom']}>
        <div className={styles['pop-up']}>
          <div id="caption" className={styles['caption']}></div>
          <Carousel 
            images={images} 
            changeIndex={changeIndex} 
            curImageIndex={curImageIndex} 
          />
        </div>
      </div>
    </div>
  );
}

export default LightBox;