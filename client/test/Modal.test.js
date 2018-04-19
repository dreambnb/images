import React from 'react';
import Modal from '../components/Modal.jsx';

describe('Testing Modal', () => {

  test('Should not display modal div when isOpen is false', () => {
    const ModalWrapper = shallow(<Modal isOpen={false}/>);
    expect(ModalWrapper.find('#modal')).toHaveLength(0);
  });

  test('Should display modal div when isOpen is true', () => {
    const ModalWrapper = shallow(<Modal isOpen={true}/>);
    expect(ModalWrapper.find('#modal')).toHaveLength(1);
  });

})