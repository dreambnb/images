const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const db = require('./database/index.js');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/images/:location_id', (req, res) => {
  console.log('GET STARTED')
  db.get(req.params.location_id, (err, results) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end(err);
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      console.log('GET FINISHED');
      res.end(JSON.stringify(results));
    }
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});