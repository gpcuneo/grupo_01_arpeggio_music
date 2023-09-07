'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('invoices', 'sub_total');
    await queryInterface.removeColumn('invoices', 'taxes');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('invoices', 'sub_total', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    await queryInterface.addColumn('invoices', 'taxes', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
  },
};