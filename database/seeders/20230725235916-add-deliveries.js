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
            await queryInterface.bulkInsert ('deliveries',[
              {type:'Retiro en el local',createdAt:dateNow,updatedAt:dateNow},
              {type:'OCA', createdAt:dateNow,updatedAt:dateNow},
              {type:'Andreani', createdAt:dateNow, updatedAt:dateNow},
              {type:'Mensajeria privada', createdAt:dateNow, updatedAt:dateNow},
              ],{});
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
    await queryInterface.bulkDelete('v', null, {});
  }
};