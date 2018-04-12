const db = require('../database/index.js');

describe('Testing database', () => {
  
  test('Should return an array', () => {
    db.get(3, (err, result) => {
      expect(Array.isArray(result)).toBe(true);
    });
  });

  test('Should return correct data for given location id', () => {
    db.get(5, (err, result1) => {
      expect(result1[0].src).toBe(`https://s3.amazonaws.com/fantasybnb-images/5-2.jpg`);
      db.get(5, (err, result2) => {
        expect(result2[0].src).toBe(`https://s3.amazonaws.com/fantasybnb-images/5-2.jpg`);
      });
    });
  });

  test('Should return an empty array for nonexistent location id', () => {
    db.get(200, (err, result) => {
      expect(result.length).toBe(0);
    });
  });
});