const AWS = require('aws-sdk');
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const awsConfig = require('../config/aws.js');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = awsConfig.accessKeyId;
AWS.config.secretAccessKey = awsConfig.secretAccessKey;
AWS.config.region = awsConfig.region;
const s3 = new AWS.S3();

const starters = ['What a ', 'I wish my house had such a(n) ', 'This is a ', 'Super cool ', 'The shag carpet makes for a ', 'Im really loving this ', 'Here is the '];
const adjectives = ['bombtastic ', 'gorgeous ', 'filthy', 'unfortunate ', 'peaceful ', 'salubrious ', 'spacious ', 'cozy ', ''];
const nouns = ['living room', '🍆', 'bowling alley', 'bedroom', 'granny flat', 'view', 'kitchen', 'studio', 'dungeon', 'man-cave', 'she-shed'];
const endings = ['!', '.', '?', ' 😘', ' 😅', ' 🤨'];

const generateRandomCaption = function () {
  return starters[Math.floor(Math.random() * starters.length)]
    + adjectives[Math.floor(Math.random() * adjectives.length)]
    + nouns[Math.floor(Math.random() * nouns.length)]
    + endings[Math.floor(Math.random() * endings.length)];
};

const seeder = () => {
  s3.listObjectsV2({ Bucket: 'dream-bnb' }, (err, { Contents }) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < 500; i++) {
        let batch = '';
        for (let j = 1; j <= 10000; j++) {
          const imgs = { images: [] };
          for (let k = 0; k < 5; k++) {
            let image = {
              fileName: Contents[Math.floor(Math.random() * (Contents.length - 1))].Key,
              caption: generateRandomCaption(),
            };
            imgs.images.push(image);
          }
          batch += `${faker.address.streetAddress()}|${JSON.stringify(imgs)}\n`;
        }
        fs.appendFileSync(path.join(__dirname, './jsonpostgres/locations1.csv'), batch);
        console.log(`batch ${i} done`);
      }
    }
  });
};

seeder();