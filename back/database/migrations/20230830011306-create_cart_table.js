'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      userid: {
          type: Sequelize.DataTypes.CHAR(36),
          allowNull: false,
          references: {
              model: 'users',
              key: 'id',
          },
      },
      productid: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'products',
              key: 'id',
          },
      },
      quantity: {
          type: Sequelize.DataTypes.INTEGER,
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
    await queryInterface.dropTable('carts');
  }
};
