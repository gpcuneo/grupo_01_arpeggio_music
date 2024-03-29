'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,references: {
          model: 'users',
          key: 'id'
        },
      },
      delivery_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'deliveries',
          key: 'id'
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
    
  }
};
