import React from 'react';
import Carousel from '../components/Carousel.jsx';
import {images3 as images} from './exampleData';
import sinon from 'sinon';

describe('Testing Carousel', () => {
  test('Should go to the new index on prop change', () => {
    sinon.spy(Carousel.prototype, 'goToIndex');
    const CarouselWrapper = mount(<Carousel images={images} curImageIndex={2}/>);
    CarouselWrapper.setProps({curImageIndex: 5})
    expect(Carousel.prototype.goToIndex.calledOnce).toBe(true);
  });
})