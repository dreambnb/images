require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const redis = require('redis');
const request = require('request');
require('dotenv').config();

const db = require('./database/index');
const { handleError } = require('./helpers');

const app = express();
const host = process.env.NODE_ENV === 'production' ? '172.17.0.2' : '127.0.0.1';
const client = redis.createClient('6379', host);
const port = process.env.PORT || 8080;
const s3Path = 'https://s3-us-west-1.amazonaws.com/dream-bnb/';

client.on('error', function (err) {
  console.log(err);
});

// client.on('connect', function () {
//   console.log('Client is connected to redis server');
// });

app.use(cors());
// app.use((req, res, next) => {
//   console.log(`serving ${req.method} request to ${req.url}`);
//   next();
// })

process.env.NODE_ENV === 'production' 
  ? app.use('/:locationId', express.static(path.join(__dirname, '../public'))) 
  : app.use('/:locationId', express.static(path.join(__dirname, '../client/dist')));

app.get('/images/:locationId', (req, res) => {
  let { locationId } = req.params;
  
  client.get(locationId, async (err, result) => {
    if (result) {
      console.log('found in cache');
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
        // add to cache
        client.setex(location_id, 120, stringifyResBody);
        // write to response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(stringifyResBody);
      } catch (error) {
        handleError(error);
      }
    };
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});