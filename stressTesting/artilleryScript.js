const fs = require('fs');

for (let i = 1; i <= 1000; i++) {
  for (let j = 1; j < 10000; j++) {
    fs.appendFileSync('./stressTesting/artilleryids.csv', `${i * 10000 + j}\n`);
  }
}
console.log('Done seeding');
