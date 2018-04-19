import React from 'react';
import Slider from 'react-slick';

import styles from '../styles/carousel-style.css';

class Carousel extends React.Component {
  componentDidUpdate() {
    this.goToIndex(this.props.curImageIndex);
  }
  
  goToIndex(curImageIndex) {
    this.slider.slickGoTo(curImageIndex);
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
          <div key={index} className={styles['slide']}>
            <div className={styles['thumbnail-frame']}>
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