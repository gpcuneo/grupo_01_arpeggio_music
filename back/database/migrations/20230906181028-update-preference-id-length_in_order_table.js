'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('orders', 'preference_id', {
      type: Sequelize.CHAR(46),
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('orders', 'preference_id', {
      type: Sequelize.CHAR(36),
      allowNull: true,
    });
  },
};