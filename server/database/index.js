const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.Promise = global.Promise;

console.log(process.env.NODE_ENV);

mongoose.connect(`mongodb://localhost:27017/images`);

let imageSchema = mongoose.Schema({
  'location_id': { type: Number, required: true, unique: true },
  'location_name': String,
  'images': Array,  
  'captions': Array, 
}, { timestamps: true });

let Image = mongoose.model('Image', imageSchema);

let get = function(locationId, cb) {
  Image.find({ 'location_id': locationId}).exec()
    .then((results) => {
      cb(null, results); 
    })
    .catch((err) => {
      cb(err, null);
    });
};

module.exports = {
  Image,
  get,
};