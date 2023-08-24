'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      type: {
          type: Sequelize.DataTypes.STRING(25),
          allowNull: false,
      },
      createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
      },
      updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
