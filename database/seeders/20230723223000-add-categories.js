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
              {name: 'Guitarras', img: '1690930418159-portada1-1536x813.png' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Bajos', img: '1690930424455-bajosIbanez.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Teclados', img: '1690930431501-d30b65e-teclado-sintetizador.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Violines', img: '1690930473068-violin-stradivarius-1920-3.jpeg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Ukeleles', img: '1690930481026-best-ukulele-brands.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Baterias', img: '1690930679618-percusion.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Audio DJ', img: '1690930671044-sonido_2.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Consolas', img: '1690930719615-consola-sonido-profesional-01.jpg' ,createdAt: dateNow, updatedAt: dateNow},
              {name: 'Microfonos', img: '1690930778787-microfonos.jpeg' ,createdAt: dateNow, updatedAt: dateNow}
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