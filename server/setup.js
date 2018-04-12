const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const https = require('https');
const axios = require('axios');
const fetch = require('node-fetch');
const _ = require('lodash');

const awsConfig = require('./config/aws.js');
const mLabConfig = require('./config/mLab.js');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = awsConfig.accessKeyId;
AWS.config.secretAccessKey = awsConfig.secretAccessKey;
AWS.config.region = awsConfig.region;
const s3 = new AWS.S3();

mongoose.connect(`mongodb://${mLabConfig.username}:${mLabConfig.password}@ds241039.mlab.com:41039/fantasybnb`);

let imageSchema = mongoose.Schema({
  location_id: Number,
  caption: String, 
  src: { type: String, required: true, unique: true},
  
}, {timestamps: true})

let Image = mongoose.model('Image', imageSchema);

var determineLocationId = function(key) {
  var id = key.split('.')[0];
  var locationId = id.split('-')[0];
  locationId = parseInt(locationId);
  if (!isNaN(locationId)) {
    return locationId;
  }
  return 51 + Math.floor(Math.random() * 49);
}

var starters = ["What a ", "This is a ", "Super cool ", "I'm really loving this ", "Here is the "];
var adjectives = ["bombtastic ", "gorgeous ", "great ", "peaceful ", "spacious ", "cozy ", ""];
var nouns = ["neighborhood", "living room", "bedroom", "view", "kitchen", "studio"];
var endings = ["!", ".", " :]", " :D", "!!!"]

var generateRandomCaption = function() {
  return starters[Math.floor(Math.random() * starters.length)] 
  + adjectives[Math.floor(Math.random() * adjectives.length)]
  + nouns[Math.floor(Math.random() * nouns.length)] 
  + endings[(Math.random() * endings.length)];
}

s3.listObjectsV2({Bucket: 'fantasybnb-images'}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    _.forEach(data.Contents, (img) => {
      var image = new Image({
        location_id: determineLocationId(img.Key),
        caption: generateRandomCaption(),
        src: `https://s3.amazonaws.com/fantasybnb-images/${img.Key}`
      })
      image.save();
    })
  }
})

