const redis = require('redis');

const host = process.env.REDIS_HOST || 'localhost';
// const client = redis.createClient('6379', HOST);
const client = redis.createClient('6379', host);

client.on('error', function (err) {
  console.log(err);
});
client.on('connect', function () {
  console.log('Client is connected to redis server');
});

module.exports = {
  client,
}