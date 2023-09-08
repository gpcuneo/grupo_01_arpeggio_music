'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'status', {
      type: Sequelize.STRING,
      allowNull: true, // Puedes ajustar esto según tus requisitos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'status');
  },
};