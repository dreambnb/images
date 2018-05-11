const redis = require('redis');

const { HOST } = require('../server.js')

// const client = redis.createClient('6379', HOST);
const client = redis.createClient('6379', 'redis');

client.on('error', function (err) {
  console.log(err);
});
client.on('connect', function () {
  console.log('Client is connected to redis server');
});

module.exports = {
  client,
}