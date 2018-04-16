import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import Modal from './Modal.jsx';
import LightBox from './LightBox.jsx';

import style from "../styles/style.css";

class ImageService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didFetch: false,
      openModal: false,
      allImagesLoaded: false,
      imageCount: 0,
      curImageIndex: 0,
      images: []
    }
    this.fetchNewImages = this.fetchNewImages.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.setState({
      imageCount: imageCount,
      allImagesLoaded: allImagesLoaded
    })
  }

  fetchNewImages(locationId) {
    return axios.get(`/images/${locationId}`)
      .then((results) => {
        let allImagesLoaded = results.data.length === 0; //If no images are returned, then there is no point in waiting for images to load
        this.setState({
          images: results.data,
          didFetch: true,
          allImagesLoaded: allImagesLoaded
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  openModal(e) {
    let background = document.getElementById('background');
    let photosButton = document.getElementById('photos-button');
    console.log(e.target)
    if (e.target !== background && e.target !== photosButton) {
      return;
    }
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
    this.setState({
      curImageIndex: index
    })
  }

  render() {
    let {images, imageCount, didFetch, allImagesLoaded, openModal, curImageIndex} = this.state;
    console.log(this.state.images);
    console.log(this.state.didFetch);
    let imgUrl = images.length > 0 ? images[0].src : null;
    return (
      <div className={style['main-image']}>
        <div>
          {!allImagesLoaded ? <div className={style.background}><h1>Loading...</h1></div>
          : images.length === 0 
              ? <div id="no-images" className={style.background}><h1>The owner has not posted any pictures of this place yet!</h1></div>
              : <div id="background" className={style.background} style={{backgroundImage: `url("${imgUrl}")`, cursor: 'pointer'}} onClick={(e) => this.openModal(e)}>
                <div className={style['view-photos']}>
                  <button id="photos-button" className={style.button} onClick={(e) => this.openModal(e)}>View Photos</button>
                </div>
              </div>
          }
        </div>
        <div style={{display: 'none'}}>
          {images.map((image) => 
            <img src={image.src} onLoad={this.onImageLoad}/> // I want to show the images component to the screen only after all images loaded
          )}
        </div>
        <Modal isOpen={openModal}>
          <LightBox 
            images={images} 
            curImageIndex={curImageIndex} 
            closeModal={this.closeModal}
            changeIndex={this.changeIndex}
          />
        </Modal>
      </div>
    )
  }
}

export default ImageService;