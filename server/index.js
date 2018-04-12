const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/images/:location_id', (req, res) => {
  
})

app.listen(port, () => {
  console.log('Listening on port ' + port);
})