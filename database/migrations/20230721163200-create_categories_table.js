'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', { 
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
          type: Sequelize.DataTypes.STRING(40),
          allowNull: false,
      },
      img: {
          type: Sequelize.DataTypes.STRING(40),
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
    await queryInterface.dropTable('categories');
  }
};
