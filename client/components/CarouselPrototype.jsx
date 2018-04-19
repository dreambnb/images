
// The initial version, keeping just in case  

import React from 'react';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

import styles from '../styles/carousel-style.css';

const Carousel = ({images, changeIndex, curImageIndex}) => {
  const IMAGES_TO_SHOW = 7;
 
  const rotateArray = (images, curImageIndex) => {
    let result = {};
    if (images.length <= IMAGES_TO_SHOW) {
      result.displayedImages = images;
      result.highlightIndex = curImageIndex;
      return result;
    }
    if (curImageIndex <= 3) {
      result.displayedImages = JSON.parse(JSON.stringify(images.slice(0, IMAGES_TO_SHOW)));
      result.highlightIndex = curImageIndex;
      return result;
    }
    if (curImageIndex >= images.length - 4) {
      result.displayedImages = JSON.parse(JSON.stringify(images.slice(images.length - IMAGES_TO_SHOW)));
      let indicesToEnd = images.length - curImageIndex - 1; // Calculate how many positions the image is from the end;
      result.highlightIndex = IMAGES_TO_SHOW - indicesToEnd - 1;
      return result;
    }
    result.displayedImages = [];
    for (let i = -3; i <= 3; i++) {
      result.displayedImages.push(images[curImageIndex+i]);
    }
    result.highlightIndex = 3;
    return result;
  }

  let { displayedImages, highlightIndex } = rotateArray(images, curImageIndex); //Rotates array so that current image is in middle
  console.log(displayedImages);
  return (
    <div id="slider-container" className={styles['slider-container']}>
        {displayedImages.map((image, index) => 
          <div className={styles['thumbnail-frame']}>
            <img 
              className={styles['thumbnail']} 
              src={image.src} 
              style={{filter: index === highlightIndex ? 'brightness(100%)' : null}}
              onClick={() => changeIndex(image.index)}
            />
          </div>
        )}
    </div>
  );
};

export default Carousel;