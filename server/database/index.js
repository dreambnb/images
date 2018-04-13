const mongoose = require('mongoose');
const _ = require('lodash');

const mLabConfig = require('./config/mLab.js');

mongoose.connect(`mongodb://${mLabConfig.username}:${mLabConfig.password}@ds241039.mlab.com:41039/fantasybnb`);

let imageSchema = mongoose.Schema({
  "location_id": Number,
  "caption": String, 
  "src": { type: String, required: true, unique: true},
  
}, {timestamps: true});

let Image = mongoose.model('Image', imageSchema);

let get = function(locationId, cb) {
  Image.find({ "location_id": locationId}).exec()
    .then((results) => {
      cb(null, results); 
    })
    .catch((err) => {
      cb(err, null);
    });
};

module.exports = {
  get: get
};