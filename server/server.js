const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const redis = require('redis');
const responseTime = require('response-time');
const request = require('request');
require('dotenv').config();

const db = require('./database/index');
const { handleError } = require('./helpers');

console.log('Updated server.js');
const app = express();
const host = process.env.NODE_ENV === 'production' ? '172.17.0.2' : '127.0.0.1';
const client = redis.createClient('6379', host);
const port = process.env.PORT || 8080;

client.on('error', function (err) {
  console.log(err);
});

client.on('connect', function () {
  console.log('Client is connected to redis server');
});

app.use(cors());
app.use(responseTime());

process.env.NODE_ENV === 'production' 
  ? app.use('/:locationId', express.static(path.join(__dirname, '../public'))) 
  : app.use('/:locationId', express.static(path.join(__dirname, '../client/dist')));

app.get('/images/:location_id', (req, res) => {
  let { location_id } = req.params;
  
  client.get(location_id, async (err, result) => {
    if (result) {
      console.log('found in cache');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(result);
    } else {
      try {
        // if not in cache, get asset from db
        const locationData = await db.getLocationId(location_id);
        console.log('locationData: ', locationData);
        const responseBody = {
          locationName: '',
          images: '',
        };
        // add to cache
        client.setex(locationId, 120, JSON.stringify(result));
        // write to response
        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify(result));
      } catch (error) {
        handleError(error);
      }
    };
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});