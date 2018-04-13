const db = require('../database/index.js');

describe('Testing database', () => {
  
  test('Should return an array', (done) => {
    db.get(3, (err, result) => {
      expect(Array.isArray(result)).toBe(true);
      done();
    });
  });

  test('Should return correct data for given location id', (done) => {
    db.get(5, (err, result1) => {
      expect(result1[0].src).toBe('https://s3.amazonaws.com/fantasybnb-images/5-2.jpg');
      db.get(5, (err, result2) => {
        expect(result2[0].src).toBe('https://s3.amazonaws.com/fantasybnb-images/5-2.jpg');
        done();
      });
    });
  });

  test('Should return an empty array for nonexistent location id', (done) => {
    db.get(200, (err, result) => {
      expect(result.length).toBe(0);
      done();
    });
  });
});