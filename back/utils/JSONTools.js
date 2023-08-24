const fs = require('fs');
const path = require('path')
const tools = require('./tools')
const dataDir = path.resolve(__dirname, '../data/');
const tmpDir = path.resolve(__dirname, '../tmp/');

function writeFile(file, contentFile) {
    let fullPathFile = '';
    if(file.search('.json') != -1) {
        fullPathFile = dataDir + '/' + file;
    } else {
        fullPathFile = tmpDir + '/' + file;
    }
    try {
        fs.writeFileSync(fullPathFile, contentFile, 'utf-8');
        console.log('Se guardaron los cambios en el archivo: ', file);
    } catch(error) {
        console.error('Error al escribir el archivo', error);
    }
}

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
    const contentFile = JSON.stringify(content);
    writeFile(file, contentFile)
};

function exportToCSV(file) {
    let users = this.read(file);
    users = users.map((user) => {
        user.password = '';
        return user;
    });
    console.log(users)
    let csvHeader = tools.keysToString(users[0]);
    let rows = '';
    for(let i=0; i<users.length; i++) {
        const row = tools.valuesToString(users[i]);
        rows += row + '\n';
    };
    const fileName = 'user_list_' + Date.now() + '.csv'
    const contentFile = csvHeader + '\n' + rows;
    writeFile(fileName, contentFile);
    return fileName;
};

const jsonTools = {
    read: readJSONData,
    write: writeJsonData,
    exportToCSV: exportToCSV,
}

module.exports = jsonTools;