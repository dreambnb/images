const mongoose = require('mongoose');
const { handleError } = require('../helpers');
mongoose.Promise = global.Promise;

// mongoose.connect(`mongodb://localhost:27017/images`);
mongoose.connect('mongodb://mongo/Reservations');

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

const addNewImage = (locationId, newImage) => {
  Image.findOneAndUpdate(
    { 'location_id': locationId},
    { $push: { "images": newImage } },
    { upsert: true, new: true },
    (error, model) => {
      if (error) handleError(error);
    }
  );
};

module.exports = {
  Image,
  getLocationId,
  addNewImage,
};