import React from 'react';
import Slider from 'react-slick';

import styles from '../styles/carousel-style.css';

class Carousel extends React.Component {
  componentDidUpdate() {
    this.goToIndex(this.props.curImageIndex, this.props.images);
  }
  
  goToIndex(curImageIndex, images) {
    if (curImageIndex <= 3) {
      this.slider.slickGoTo(0);
    } else if (curImageIndex >- images.length-4) {
      this.slider.slickGoTo(images.length-7);
    } else {
      this.slider.slickGoTo(curImageIndex-3);
    }
  }

  render() {
    let { images, changeIndex, curImageIndex } = this.props;
    let settings = {
      slidesToShow: 7, 
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      dots: false, 
      centerMode: false,
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