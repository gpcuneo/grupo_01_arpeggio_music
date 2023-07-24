'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};