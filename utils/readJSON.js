const fs = require('fs');
const path = require('path')

function readJSONData(file) {
    const dataDir = path.resolve(__dirname, '../data/');
    return JSON.parse(fs.readFileSync(dataDir + '/' + file));
}

module.exports = readJSONData;