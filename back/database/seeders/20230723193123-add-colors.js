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
            await queryInterface.bulkInsert('colors', [
              {name: 'Verde', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Rojo', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Negro', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Azul', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Blanco', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Gris', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Amarrillo', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Púrpura', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Rosa', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Marrón', createdAt: dateNow, updatedAt: dateNow},
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
    await queryInterface.bulkDelete('colors', null, {});
  }
};