require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const redis = require('redis');
const request = require('request');
require('dotenv').config();

const handlers = require('./routeHandlers');
const { sendHTML } = require('./render');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
 
app.use('/:locationId', express.static(path.join(__dirname, '../client/dist')));
app.use('/html/:locationId', sendHTML);

app.get('/images/:locationId', handlers.get);
app.post('/images/:locationId', handlers.post);

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
