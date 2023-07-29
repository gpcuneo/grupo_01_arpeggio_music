'use strict';
var path = require('path');
const loadStatus = require('./check_load')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    var fileName = path.basename(__filename);
    const isInitialized = await loadStatus.checkIfInitialized(fileName);
    if (!isInitialized) {
        try {
            const dateNow = new Date();
            await queryInterface.bulkInsert('categories', [
              {name: 'Guitarras', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Bajos', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Teclados', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Violines', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Ukeleles', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Baterias', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Audio DJ', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Consolas', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Microfonos', img: 'guitarracriolla-01.jpg' ,createdAt: dateNow, updatedAt: dateNow}
            ], {});
            console.log('Datos iniciales insertados con éxito.');

            await loadStatus.markAsInitialized(fileName);
        } catch (error) {
            console.error('Error al insertar datos iniciales:', error);
        }
    } else {
        console.log('La inicialización ya se ha realizado previamente.');
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};