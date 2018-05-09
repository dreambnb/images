const db = require('./database/index');
const { handleError } = require('./helpers');
const { client } = require('./server.js');

const s3Path = 'https://s3-us-west-1.amazonaws.com/dream-bnb/';

module.exports = {
  get: (req, res) => {
    let { locationId } = req.params;

    client.get(locationId, async (err, result) => {
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(result);
      } else {
        try {
          const results = await db.getLocationId(locationId);
          let { location_id, location_name, images } = results[0];
          images = images.map(({ src, caption }) => ({
            src: s3Path + src,
            caption,
          }));
          const responseBody = {
            location_id,
            location_name,
            images,
          };
          const stringifyResBody = JSON.stringify(responseBody);
          client.setex(location_id, 120, stringifyResBody);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(stringifyResBody);
        } catch (error) {
          handleError(error);
        }
      };
    });
  },

  post: async (req, res) => {
    const { body, params: { locationId }} = req;
    const newImg = body;
    try {
      await db.addNewImage(locationId, newImg);
      res.status(201).end('image added');
    } catch (error) {
      handleError(error);
      res.status(501).end();
    }
  }
};
