import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import Modal from './Modal.jsx';
import LightBox from './LightBox.jsx';

import style from '../styles/image-service-style.css';

class ImageService extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      openModal: false,
      allImagesLoaded: false,
      imageCount: 0,
      curImageIndex: 0,
      images: [],
    }
    this.fetchNewImages = this.fetchNewImages.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeIndex = this.changeIndex.bind(this);
  }

  componentDidMount() {
    console.log(this.props.locationId);
    this.fetchNewImages(this.props.locationId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locationId !== this.props.locationId) {
      this.fetchNewImages(this.props.locationId);
    }
  }

  onImageLoad() {
    let {imageCount, allImagesLoaded, images} = this.state;
    if (imageCount === images.length) {
      return;
    }
    imageCount++;
    allImagesLoaded = imageCount === images.length;
    console.log('Images loaded: ' + allImagesLoaded);
    this.setState({
      imageCount: imageCount,
      allImagesLoaded: allImagesLoaded
    })
  }

  fetchNewImages(locationId) {
    return axios.get(`/images/${locationId}`)
      .then((results) => {
        let allImagesLoaded = results.data.length === 0; //If no images are returned, then there is no point in waiting for images to load
        let i = 0;
        let images = _.forEach(results.data, (image) => {
          image.index = i;
          i++;
        })

        this.setState({
          images: images,
          didFetch: true,
          allImagesLoaded: allImagesLoaded
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  openModal() {
    document.body.style.overflow = "hidden";
    this.setState({
      openModal: true
    })
  }

  closeModal() {
    document.body.style.overflow = "initial";
    this.setState({
      openModal: false
    })
  }

  changeIndex(index) {
    if (index < 0) {
      index = this.state.images.length-1;
    } else if (index >= this.state.images.length) {
      index = 0;
    }
    this.setState({
      curImageIndex: index
    })
  }

  render() {
    let {images, imageCount, allImagesLoaded, openModal, curImageIndex} = this.state;
    let imgUrl = images.length > 0 ? images[0].src : null;
    return (
      <div className={style['main-image']}>
        <div>
          {!allImagesLoaded ? <div className={style['background']}><h1>Loading...</h1></div>
          : images.length === 0 
              ? <div id="no-images" className={style['background']}><h1>The owner has not posted any pictures of this place yet!</h1></div>
              : <div id="background" ref={background => (this.background = background)} 
                  className={style['background']} 
                  style={{backgroundImage: `url("${imgUrl}")`, cursor: 'pointer'}} 
                  onClick={this.openModal}>
                  <div className={style['view-photos']}>
                    <button ref={photosButton => (this.photosButton = photosButton)} 
                      id="photos-button" 
                      className={style['button']} 
                      onClick={this.openModal}
                    >
                      View Photos
                    </button>
                  </div>
                </div>
          }
        </div>
        <Modal isOpen={openModal}>
          <LightBox 
            key="LightBox"
            images={images} 
            curImageIndex={curImageIndex} 
            closeModal={this.closeModal}
            changeIndex={this.changeIndex}
          />
        </Modal>
        <div style={{display: 'none'}}>
          {images.map((image) => 
            <img src={image.src} onLoad={this.onImageLoad}/> // I want to show the images component to the screen only after all images loaded
          )}
        </div>
      </div>
    )
  }
}

export default ImageService;