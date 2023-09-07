'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('invoices', 'payment_type', {
      type: Sequelize.STRING,
      allowNull: true, // Puedes ajustar esto según tus requisitos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('invoices', 'payment_type');
  },
};
