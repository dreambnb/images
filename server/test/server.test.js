const request = require('request');
const uri = 'http://127.0.0.1/8080';

describe('Testing server', () => {
  test('Should return 200 on successful fetch', () => {
    request({
      method: 'GET',
      uri: uri + '/images/5',
    }, (err, res, body) => {
      expect(res.StatusCode).toBe(200);
    })
  });

  test('Should return 404 with invalid url', () => {
    request({
      method: 'GET',
      uri: uri + '/REEEE',
    }, (err, res, body) => {
      expect(res.StatusCode).toBe(404);
    })
  });

  test('Should return 404 when no id provided', () => {
    request({
      method: 'GET',
      uri: uri + '/images',
    }, (err, res, body) => {
      expect(res.StatusCode).toBe(404);
    })
  });
})