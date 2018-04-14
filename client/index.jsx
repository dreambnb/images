import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';

import Modal from './components/Modal.jsx';

import style from "./styles/style.css";

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
    axios.get(`/images/${locationId}`)
      .then((results) => {
        this.setState({
          images: results.data,
          didFetch: true
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

  closeModal(e) {
    var modal = document.getElementById('modal');
    if (e.target !== modal) {
      return;
    }
    document.body.style.overflow = "initial";
    this.setState({
      openModal: false
    })
  }

  render() {
    let {images, imageCount, didFetch, allImagesLoaded, openModal} = this.state;
    console.log(this.state.images);
    console.log(this.state.didFetch);
    let imgUrl = images.length > 0 ? images[0].src : null;
    return (
      <div className={style['image-container']}>
        <div>
          {images.length === 0 || !allImagesLoaded 
          ? <div className={style.background}><h1>The owner has not posted any pictures of this place yet!</h1></div>
          : <div className={style.background} style={{backgroundImage: `url("${imgUrl}")`}}>
              <div className={style['view-photos']}>
                <button className={style.button} onClick={this.openModal}><span>View Photos</span></button>
              </div>
            </div>
          }
        </div>
        <div style={{display: 'none'}}>
          {images.map((image) => 
            <img src={image.src} onLoad={this.onImageLoad}/> // I want to show the images component to the screen only after all images loaded
          )}
        </div>
        <Modal isOpen={openModal} closeModal={this.closeModal}>
          <div className={style['modal-content']}>
          </div>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(
  <ImageService locationId={38}/>,
  document.getElementById('image-service')
);
