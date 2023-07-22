'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', { 
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
          type: DataType.STRING(40),
          allowNull: false,
      },
      img: {
          type: DataType.STRING(40),
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
    await queryInterface.dropTable('categories');
  }
};
