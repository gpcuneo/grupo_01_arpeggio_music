'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dateNow = new Date();
    await queryInterface.bulkInsert ('deliveries',[
    {type:'Retiro en el local',createdAt:dateNow,updatedAt:dateNow},
    {type:'OCA', createdAt:dateNow,updatedAt:dateNow},
    {type:'Andreani', createdAt:dateNow, updatedAt:dateNow},
    {type:'Mensajeria privada', createdAt:dateNow, updatedAt:dateNow},
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deliveries',null,{})
  }
};


