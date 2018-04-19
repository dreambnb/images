import React from 'react';
import Slider from 'react-slick';

import styles from '../styles/carousel-test-style.css';

// Trying to get react-slick to work in the carousel

class Carousel extends React.Component {
  componentDidUpdate() {
    this.slider.slickGoTo(this.props.curImageIndex); 
  }

  render() {
    let { images, changeIndex, curImageIndex } = this.props;
    let settings = {
      slidesToShow: 7, 
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      dots: false, 
      centerMode: true, 
      focusOnSelect: true, 
      className: styles['slider']
    };

    return (
      <div id="slider-container" className={styles['slider-container']}>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          {images.map((image, index) => 
          <div className={styles['slide']}>
            <div key={index} className={styles['thumbnail-frame']}>
              <img 
                id={`Image ${index}`}
                className={styles['thumbnail']} 
                src={image.src} 
                style={{filter: index === curImageIndex ? 'brightness(100%)' : null}}
                onClick={() => changeIndex(index)}
              />
            </div>
          </div>
          )}
        </Slider>
      </div>
    );
  }
}

export default Carousel;