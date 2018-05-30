const redis = require('redis');

const host = process.env.REDIS_HOST || 'localhost';

const client = redis.createClient('6379', host);

client.on('error', console.error);
client.on('connect', () => {
  console.log('Client is connected to redis server');
});

module.exports = {
  client,
};
