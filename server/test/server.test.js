const request = require('request');
const uri = 'http://127.0.0.1:8080';

describe('Testing server', () => {
  test('Should return 200 on successful fetch', (done) => {
    request({
      method: 'GET',
      uri: uri + '/images/5',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('Should return 404 with invalid url', (done) => {
    request({
      method: 'GET',
      uri: uri + '/REEEE',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(404);
      done();
    });
  });

  test('Should return 404 when no id provided', (done) => {
    request({
      method: 'GET',
      uri: uri + '/images',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(404);
      done();
    });
  });
});