import React from 'react';
import ImageService from '../components/ImageService.jsx';
import LightBox from '../components/LightBox.jsx';
import sinon from 'sinon';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Testing ImageService', () => {
  test('Should render ImageService', () =>{
    const ImageServiceWrapper = shallow(
      <ImageService locationId={3}/>
    );
    expect(ImageServiceWrapper).toMatchSnapshot();
  });

  test('Should fetch images from api upon mounting', async () => {
    sinon.spy(ImageService.prototype, 'fetchNewImages');
    const ImageServiceWrapper = mount(<ImageService locationId={3}/>);
    expect(ImageService.prototype.fetchNewImages.calledOnce).toBe(true);
  });

  test('Should display the "no images posted" message when no images returned', async () => {
    const ImageServiceWrapper = shallow(
      <ImageService locationId={'NO_IMAGES'}/>
    );
    await flushPromises();
    ImageServiceWrapper.update();
    expect(ImageServiceWrapper.find('#no-images')).toHaveLength(1);
    expect(ImageServiceWrapper.find('#background')).toHaveLength(0);
  })

  test('Should display a background image if images exist', async () => {
    const ImageServiceWrapper = mount(
      <ImageService locationId={3}/>
    );
    await flushPromises();
    ImageServiceWrapper.update();
    ImageServiceWrapper.setState({ allImagesLoaded: true }) //Can't execute onLoad function of images during test so we'll assume they've been loaded 
    expect(ImageServiceWrapper.find('#no-images')).toHaveLength(0);
    expect(ImageServiceWrapper.find('#background')).toHaveLength(1);
  })

})