import React from 'react';

import Carousel from './Carousel.jsx';

import styles from '../styles/lightbox-style.css';
import arrowRight from '../icons/arrow-right.png';
import arrowLeft from '../icons/arrow-left.png';
import popupArrow from '../icons/popup-arrow.png';

class LightBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: true
    }
    this.togglePhotoList = this.togglePhotoList.bind(this);
  }

  onModalClick(e) {
    let backdrop = document.getElementById('backdrop');
    if (e.target === backdrop) {
      this.props.closeModal();
    }
  }

  togglePhotoList(keepOpen) {

    this.setState({
      listOpen: keepOpen || !this.state.listOpen
    })
  }

  render() {
    console.log('List open:' + this.state.listOpen)
    let { images, curImageIndex, closeModal, changeIndex } = this.props;
    let curImage = images[curImageIndex];
    return (
      <div id="backdrop" className={styles['lightbox-container']} onClick={(e) => this.onModalClick(e)}>
        <button id="prev" className={styles['nav-left']} onClick={() => changeIndex(--curImageIndex)}>
          <img className={styles['nav-icon']} src={arrowLeft} style={{left: 0}}/>
        </button>
        <img 
          key={curImageIndex} 
          src={curImage.src} 
          className={styles['display-image']} 
          align="middle" 
          onClick={() => changeIndex(++curImageIndex)}
        />
        <button id="next" className={styles['nav-right']} onClick={() => changeIndex(++curImageIndex)}>
          <img className={styles['nav-icon']} src={arrowRight} style={{right: 0}}/>
        </button>
        <div id="lightbox-bottom" className={styles['lightbox-bottom']} onMouseEnter={() => this.togglePhotoList(true)}>
          <div className={styles[`photo-list-${this.state.listOpen ? 'up' : 'down'}`]}>
            <div id="photo-list-header" className={styles['photo-list-header']}>
              <span id="caption">{`${curImageIndex+1}/${images.length}: ${curImage.caption}`}</span>
              <span style={{float: 'right'}}>
                <button id="photo-list-button" className={styles['photo-list-button']} onClick={() => this.togglePhotoList()}>
                  <span>{`${this.state.listOpen ? 'Hide' : 'Show'} photo list`}</span>
                  <span style={{ marginLeft: '1px'}}><img height="10px" src={popupArrow}/></span>
                </button>
              </span>
            </div>
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
}

export default LightBox;