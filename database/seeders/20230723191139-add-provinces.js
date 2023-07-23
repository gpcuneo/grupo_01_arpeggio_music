'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dateNow = new Date();
    await queryInterface.bulkInsert('provinces', 
    [
        {name: 'Buenos Aires', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Buenos Aires-GBA', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Capital Federal', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Catamarca', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Chaco', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Chubut', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Córdoba', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Corrientes', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Entre Ríos', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Formosa', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Jujuy', createdAt: dateNow, updatedAt: dateNow},
        {name: 'La Pampa', createdAt: dateNow, updatedAt: dateNow},
        {name: 'La Rioja', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Mendoza', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Misiones', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Neuquén', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Río Negro', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Salta', createdAt: dateNow, updatedAt: dateNow},
        {name: 'San Juan', createdAt: dateNow, updatedAt: dateNow},
        {name: 'San Luis', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Santa Cruz', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Santa Fe', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Santiago del Estero', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Tierra del Fuego', createdAt: dateNow, updatedAt: dateNow},
        {name: 'Tucumán', createdAt: dateNow, updatedAt: dateNow},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('provinces', null, {});
  }
};



// [
//   {name: 'Buenos Aires', new Date(), new Date()},
//   {name: 'Buenos Aires-GBA', new Date(), new Date()},
//   {name: 'Capital Federal', new Date(), new Date()},
//   {name: 'Catamarca', new Date(), new Date()},
//   {name: 'Chaco', new Date(), new Date()},
//   {name: 'Chubut', new Date(), new Date()},
//   {name: 'Córdoba', new Date(), new Date()},
//   {name: 'Corrientes', new Date(), new Date()},
//   {name: 'Entre Ríos', new Date(), new Date()},
//   {name: 'Formosa', new Date(), new Date()},
//   {name: 'Jujuy', new Date(), new Date()},
//   {name: 'La Pampa', new Date(), new Date()},
//   {name: 'La Rioja', new Date(), new Date()},
//   {name: 'Mendoza', new Date(), new Date()},
//   {name: 'Misiones', new Date(), new Date()},
//   {name: 'Neuquén', new Date(), new Date()},
//   {name: 'Río Negro', new Date(), new Date()},
//   {name: 'Salta', new Date(), new Date()},
//   {name: 'San Juan', new Date(), new Date()},
//   {name: 'San Luis', new Date(), new Date()},
//   {name: 'Santa Cruz', new Date(), new Date()},
//   {name: 'Santa Fe', new Date(), new Date()},
//   {name: 'Santiago del Estero', new Date(), new Date()},
//   {name: 'Tierra del Fuego', new Date(), new Date()},
//   {name: 'Tucumán', new Date(), new Date()},
//   ]