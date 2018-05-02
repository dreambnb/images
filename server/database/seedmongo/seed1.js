const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const https = require('https');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const { Image } = require('../index');
const awsConfig = require('../config/aws.js');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = awsConfig.accessKeyId;
AWS.config.secretAccessKey = awsConfig.secretAccessKey;
AWS.config.region = awsConfig.region;
const s3 = new AWS.S3();

const parseLocationId = function(key) {
  const id = key.split('.')[0];
  let locationId = id.split('-');
  locationId = locationId[locationId.length - 1];
  locationId = parseInt(locationId);
  if (!isNaN(locationId)) {
    return locationId;
  }
  return 51 + Math.floor(Math.random() * 49);
};

const starters = ['What a ', 'This is a ', 'Super cool ', 'I\'m really loving this ', 'Here is the '];
const adjectives = ['bombtastic ', 'gorgeous ', 'great ', 'peaceful ', 'spacious ', 'cozy ', ''];
const nouns = ['neighborhood', 'living room', 'bedroom', 'view', 'kitchen', 'studio'];
const endings = ['!', '.', ' :]', ' :D', '!!!'];

const generateRandomCaption = function() {
  return starters[Math.floor(Math.random() * starters.length)] 
  + adjectives[Math.floor(Math.random() * adjectives.length)]
  + nouns[Math.floor(Math.random() * nouns.length)] 
  + endings[(Math.random() * endings.length)];
};

const seeder = () => {
  s3.listObjectsV2({Bucket: 'dream-bnb'}, async (err, { Contents }) => {
    if (err) {
      console.log(err);
    } else {
      const imgSrcs = Contents;
      console.time('Seeding');
      
      for (let i = 0; i < 250; i++) {
        const images = [];
        for (let j = 0; j < 10000; j++) {
          const newImage = {
            location_id: (i + 1) * (j + 1),
            location_name: 'Your Grandmother\'s basement',
            images: [
              imgSrcs[Math.floor(Math.random() * imgSrcs.length - 1)],
              imgSrcs[Math.floor(Math.random() * imgSrcs.length - 1)],
              imgSrcs[Math.floor(Math.random() * imgSrcs.length - 1)],
              imgSrcs[Math.floor(Math.random() * imgSrcs.length - 1)],
              imgSrcs[Math.floor(Math.random() * imgSrcs.length - 1)],
            ],
            caption: [
              generateRandomCaption(),
              generateRandomCaption(),
              generateRandomCaption(),
              generateRandomCaption(),
              generateRandomCaption(),
            ],
          };
          images.push(JSON.stringify(newImage));
        }
        fs.appendFileSync(path.join(__dirname,'../jsonmongo/images1.json'), images.join('\n') + '\n');
        console.log(`Batch ${i} inserted`)
      }
      console.timeEnd('Seeding Complete');
    }
  });
}
seeder();