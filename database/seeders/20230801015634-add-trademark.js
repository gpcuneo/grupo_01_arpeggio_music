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
            await queryInterface.bulkInsert('trademarks', [
              {name: 'CASIO', createdAt: dateNow, updatedAt: dateNow},
              {name: 'YAMAHA', createdAt: dateNow, updatedAt: dateNow},
              {name: 'PEARL', createdAt: dateNow, updatedAt: dateNow},
              {name: 'JACKSON', createdAt: dateNow, updatedAt: dateNow},
              {name: 'SAMSON', createdAt: dateNow, updatedAt: dateNow},
              {name: 'REMO', createdAt: dateNow, updatedAt: dateNow},
              {name: 'IBANEZ', createdAt: dateNow, updatedAt: dateNow},
              
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
    await queryInterface.bulkDelete('trademarks', null, {});
  }
};