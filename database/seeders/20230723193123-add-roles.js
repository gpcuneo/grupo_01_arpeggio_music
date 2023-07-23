'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dateNow = new Date();
    await queryInterface.bulkInsert('roles', [
      {type: 'user', createdAt: dateNow, updatedAt: dateNow},
      {type: 'admin', createdAt: dateNow, updatedAt: dateNow},
      {type: 'editor', createdAt: dateNow, updatedAt: dateNow}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
