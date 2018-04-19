import React from 'react';
import LightBox from '../components/LightBox.jsx';
import sinon from 'sinon';
import { images3 as images } from './exampleData.json';

let fillProps = {
  images: images,
  curImageIndex: 0,
  changeIndex: () => {}
}

describe('Testing LightBox', () => {
  test('Should render LightBox', () =>{
    const LightBoxWrapper = shallow(<LightBox {...fillProps}/>);
    expect(LightBoxWrapper).toMatchSnapshot();
  }); 

  test('Should toggle listOpen state when togglePhotoList invoked', () => {
    const LightBoxWrapper = mount(<LightBox {...fillProps}/>);
    let listOpenBefore = LightBoxWrapper.state().listOpen;
    LightBoxWrapper.instance().togglePhotoList();
    LightBoxWrapper.update();
    let listOpenAfter = LightBoxWrapper.state().listOpen;
    expect(listOpenBefore === listOpenAfter).toBe(false);
  });

  test('Should leave listOpen state true when togglePhotoList invoked with true', () => {
    const LightBoxWrapper = mount(<LightBox {...fillProps}/>);
    let listOpenBefore = LightBoxWrapper.state().listOpen;
    LightBoxWrapper.instance().togglePhotoList(true);
    LightBoxWrapper.update();
    let listOpenAfter = LightBoxWrapper.state().listOpen;
    expect(listOpenBefore === listOpenAfter).toBe(true);
  });

  test('Should invoke changeIndex prop  when arrows and main image clicked', () => {
    sinon.spy(fillProps, 'changeIndex');
    const LightBoxWrapper = shallow(<LightBox {...fillProps}/>);
    LightBoxWrapper.find('#prev').simulate('click');
    LightBoxWrapper.find('#next').simulate('click');
    LightBoxWrapper.find('#display-image').simulate('click');
    expect(fillProps.changeIndex.calledThrice).toBe(true);
    fillProps.changeIndex.restore();
  })

});