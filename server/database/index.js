const mongoose = require('mongoose');
const { handleError } = require('../helpers');
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost:27017/images`);

const imageSchema = mongoose.Schema({
  'location_id': { type: Number, required: true, unique: true },
  'location_name': String,
  'images': Array,  
  'captions': Array, 
}, { timestamps: true });

const Image = mongoose.model('image', imageSchema, 'images');

const getLocationId = (locationId) => {
  return Image.find({ 'location_id': locationId }, (error, results) => {
    if (error) handleError(error);
    return results;
  });
};

module.exports = {
  Image,
  getLocationId,
};