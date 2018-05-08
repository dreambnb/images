const fs = require('fs');

const pathToSeed = './stressTesting/locationids.csv';

if (fs.existsSync(pathToSeed)) {
  fs.unlinkSync(pathToSeed);
}
const batchSize = 1000;
for (let i = 0; i < 10; i++) {
  let batch = '';
  for (let j = 1; j < batchSize; j++) {
    batch += `${i * batchSize + j}\n`;
  }
  fs.appendFileSync(pathToSeed, batch);
}
console.log('Done seeding');
