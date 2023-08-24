const db = require('../models');

const checkIfInitialized = async (fileName) => {
    try {
        const result = await db.sequelize.query(`SELECT name FROM seedersMeta WHERE name = '${fileName}' LIMIT 1;`);
        return result[0].length > 0;
    } catch (error) {
        return false;
    }
};


const markAsInitialized = async (fileName) => {
    try {
        await db.sequelize.query(`INSERT INTO seedersMeta (id, name) VALUES (NULL, '${fileName}');`);
    } catch (error) {
        console.error('Error al marcar como inicializado:', error);
    }
};


const loadStatus = {
    checkIfInitialized: checkIfInitialized,
    markAsInitialized :markAsInitialized,
    up: async () => console.log('Carga de datos finalizada')
}

module.exports=loadStatus;