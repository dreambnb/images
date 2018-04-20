import React from 'react';
import ImageService from '../components/ImageService.jsx';
import sinon from 'sinon';
import { images3 } from './exampleData.json'

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Testing ImageService', () => {
  test('Should render ImageService', () =>{
    const ImageServiceWrapper = shallow(<ImageService locationId={3}/>);
    expect(ImageServiceWrapper).toMatchSnapshot();
  }); 

  test('Should fetch images from api upon mounting', () => {
    sinon.spy(ImageService.prototype, 'fetchNewImages');
    const ImageServiceWrapper = mount(<ImageService locationId={3}/>);
    expect(ImageService.prototype.fetchNewImages.calledOnce).toBe(true);
    ImageService.prototype.fetchNewImages.restore();
  });

  test('Should fetch images from api on prop change', () => {
    sinon.spy(ImageService.prototype, 'fetchNewImages');
    const ImageServiceWrapper = mount(<ImageService locationId={3}/>);
    ImageServiceWrapper.setProps({ locationId: 5});
    expect(ImageService.prototype.fetchNewImages.calledTwice).toBe(true); // Called once on initial mount, and again on prop change
    ImageService.prototype.fetchNewImages.restore();
  })

  test('Should display the "no images posted" message when no images returned', async () => {
    const ImageServiceWrapper = shallow(<ImageService locationId={"NO_IMAGES"}/>);
    await flushPromises();
    ImageServiceWrapper.update();
    expect(ImageServiceWrapper.find('#no-images')).toHaveLength(1);
    expect(ImageServiceWrapper.find('#background')).toHaveLength(0);
  })

  test('Should display a background image if images exist', async () => {
    const ImageServiceWrapper = mount(<ImageService locationId={3}/>);
    await flushPromises();
    ImageServiceWrapper.update();
    ImageServiceWrapper.setState({ allImagesLoaded: true }) //Can't execute onLoad function of images during test so we'll assume they've been loaded 
    expect(ImageServiceWrapper.find('#no-images')).toHaveLength(0);
    expect(ImageServiceWrapper.find('#background')).toHaveLength(1);
  })

  test('Should correctly set current image index when changeIndex is invoked', ()=> {
    const ImageServiceWrapper = mount(<ImageService locationId={3}/>);
    ImageServiceWrapper.setState({images: images3});
    ImageServiceWrapper.instance().changeIndex(5);
    ImageServiceWrapper.update();
    console.log(ImageServiceWrapper.state());
    let curImageIndex = ImageServiceWrapper.state().curImageIndex;
    expect(curImageIndex).toBe(5);
  })

  test('Should go to last index if changeIndex invoked with argument < 0', () => {
    const ImageServiceWrapper = mount(<ImageService locationId={3}/>);
    ImageServiceWrapper.setState({images: images3});
    ImageServiceWrapper.instance().changeIndex(-1);
    ImageServiceWrapper.update();
    let curImageIndex = ImageServiceWrapper.state().curImageIndex;
    expect(curImageIndex).toBe(5);
  })

  test('Should go to first index if changeIndex invoked with argument >= images.length', () => {
    const ImageServiceWrapper = mount(<ImageService locationId={3}/>);
    ImageServiceWrapper.setState({images: images3});
    ImageServiceWrapper.instance().changeIndex(6);
    ImageServiceWrapper.update();
    let curImageIndex = ImageServiceWrapper.state().curImageIndex;
    expect(curImageIndex).toBe(0);
  })

  test('Modal open and close functions should correctly set the state', () => {
    const ImageServiceWrapper = mount(<ImageService locationId={3}/>);
    ImageServiceWrapper.setState({
      images: images3,
      openModal: false
    });
    ImageServiceWrapper.instance().openModal();
    ImageServiceWrapper.update();
    let openModal = ImageServiceWrapper.state().openModal;
    expect(openModal).toBe(true);
    ImageServiceWrapper.instance().closeModal();
    ImageServiceWrapper.update();
    openModal = ImageServiceWrapper.state().openModal;
    expect(openModal).toBe(false);
  })

})