'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('towns', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      id_province: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
      },
      name: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: false,
      },
      createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
      },
      updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('towns');
  }
};
