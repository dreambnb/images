const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const https = require('https');
const axios = require('axios');
const fetch = require('node-fetch');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJ56XLCR5LJRHJJGA";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-east-1";


const s3 = new AWS.S3();

s3.listObjectsV2({Bucket: 'fantasybnb-images'}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.Contents);
  }
  
})

mongoose.connect('mongodb://fantasybnb:fantasybnb@ds241039.mlab.com:41039/fantasybnb');

let imageSchema = mongoose.Schema({
  location_id: Number,
  caption: String, 
  src: String,
})



var keysToMongo = function() {

}