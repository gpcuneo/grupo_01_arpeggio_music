'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('colors', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    createdAt:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    updatedAt:{
        type:Sequelize.DATE,
        allowNull:false
    }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('colors')
  }
};
