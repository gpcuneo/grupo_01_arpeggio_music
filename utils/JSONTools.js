const fs = require('fs');
const path = require('path')
const dataDir = path.resolve(__dirname, '../data/');

function readJSONData(file) {
    const fullPathFile = dataDir + '/' + file;
    try {
        return JSON.parse(fs.readFileSync(fullPathFile));
    } catch (error) {
        console.error('Error al leer el archivo: ', error);
        return false;
    }
}

function writeJsonData(file, content) {
    const JSONData = JSON.stringify(content);
    const fullPathFile = dataDir + '/' + file;
    try {
        fs.writeFileSync(fullPathFile, JSONData, 'utf-8');
        console.log('Se guardaron los cambios en el archivo: ', file);
    } catch(error) {
        console.error('Error al escribir el archivo', error);
    }
};

const jsonTools = {
    read: readJSONData,
    write: writeJsonData
}

module.exports = jsonTools;