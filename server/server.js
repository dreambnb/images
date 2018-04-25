const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const redis = require('redis');
const responseTime = require('response-time');
require('dotenv').config();

const db = require('./database/index.js');

const app = express();
const client = redis.createClient();
const port = process.env.PORT || 8080;

client.on('error', function (err) {
  console.log(err);
});

app.use(cors());
app.use(responseTime());

process.env.NODE_ENV === 'production' 
  ? app.use(express.static(path.join(__dirname, '../public'))) 
  : app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/images/:location_id', (req, res) => {
  let locationId = req.params.location_id;
  db.get(locationId, (err, results) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end(err);
    } else {
      client.setex(locationId, 120, JSON.stringify(results));
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(results));
    }
  });
  // client.get(locationId, (err, results) => {
  //   if (results) {
  //     console.log('found');
  //     console.log(typeof results);
  //     res.writeHead(200, {'Content-Type': 'application/json'});
  //     res.end(results);
  //   } else {
  //     db.get(locationId, (err, results) => {
  //       if (err) {
  //         res.writeHead(404, {'Content-Type': 'text/plain'});
  //         res.end(err);
  //       } else {
  //         client.setex(locationId, 120, JSON.stringify(results));
  //         res.writeHead(200, {'Content-Type': 'application/json'});
  //         res.end(JSON.stringify(results));
  //       }
  //     });
  //   }
  // });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});