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
          await queryInterface.bulkInsert('provinces', 
          [
              {name: 'Buenos Aires', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Buenos Aires-GBA', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Capital Federal', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Catamarca', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Chaco', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Chubut', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Córdoba', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Corrientes', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Entre Ríos', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Formosa', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Jujuy', createdAt: dateNow, updatedAt: dateNow},
              {name: 'La Pampa', createdAt: dateNow, updatedAt: dateNow},
              {name: 'La Rioja', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Mendoza', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Misiones', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Neuquén', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Río Negro', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Salta', createdAt: dateNow, updatedAt: dateNow},
              {name: 'San Juan', createdAt: dateNow, updatedAt: dateNow},
              {name: 'San Luis', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Santa Cruz', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Santa Fe', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Santiago del Estero', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Tierra del Fuego', createdAt: dateNow, updatedAt: dateNow},
              {name: 'Tucumán', createdAt: dateNow, updatedAt: dateNow},
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
    await queryInterface.bulkDelete('provinces', null, {});
  }
};
