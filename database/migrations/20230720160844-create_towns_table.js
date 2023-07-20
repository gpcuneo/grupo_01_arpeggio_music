'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      id_province: {
          type: DataType.INTEGER,
          allowNull: false,
      },
      town: {
          type: DataType.STRING(255),
          allowNull: false,
      },
      createdAt: {
          type: DataType.DATE,
          allowNull: false,
      },
      updatedAt: {
          type: DataType.DATE,
          allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('towns');
  }
};
