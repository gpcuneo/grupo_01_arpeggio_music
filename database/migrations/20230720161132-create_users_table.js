'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
        id: {
            type: Sequelize.DataTypes.CHAR(36),
            primaryKey: true,
            allowNull: false,
        },
        userName: {
            type: Sequelize.DataTypes.STRING(36),
            allowNull: false,
        },
        firstName: {
            type: Sequelize.DataTypes.STRING(24),
            allowNull: false,
        },
        lastName: {
            type: Sequelize.DataTypes.STRING(24),
            allowNull: false,
        },
        email: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        address: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        id_town: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'towns',
                key: 'id'
            },
        },
        id_province: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'provinces',
                key: 'id'
            },
        },
        id_rol: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id'
            },
        },
        dni: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        phone: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        password: {
            type: Sequelize.DataTypes.CHAR(60),
            allowNull: false,
        },
        active: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
        },
        lastIP: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: Sequelize.DataTypes.TEXT,
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
        await queryInterface.dropTable('users');
    }
};
