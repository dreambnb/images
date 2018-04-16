import { data as images } from './exampleData.json';

const IMAGES_ENDPOINT = '/images/3';
const NO_IMAGES_ENDPOINT = '/images/NO_IMAGES';

console.log('axios js used');

module.exports = {
  get: jest.fn((url) => {
    switch (url) {
      case IMAGES_ENDPOINT:
        return Promise.resolve({
          data: images
        })
      case NO_IMAGES_ENDPOINT:
      return Promise.resolve({
        data: []
      })
    }
  })
};