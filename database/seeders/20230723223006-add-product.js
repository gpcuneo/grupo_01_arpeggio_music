'use strict';
var path = require('path');
const loadStatus = require('./check_load')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    var fileName = path.basename(__filename);
    const isInitialized = await loadStatus.checkIfInitialized(fileName);
    if (!isInitialized) {
        try {
            const dateNow = new Date();
            await queryInterface.bulkInsert('products', [
              {name: 'Batería Acústica',characteristics:'Batería Acústica 5 cuerpos 20 14 12 10 Yamaha Rydeen Rdp0f5',price:250000,discount:20,stock:1,category_id:6, description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',store:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',image:'["image-32.jpg","image-45.jpg","image-33.jpg","image-34.jpg","image-35.jpg"]',createdAt: dateNow, updatedAt:dateNow},
              {name: 'Redoblante',characteristics:'Redoblante Roadshow 14x6,5 8 Torres Rsn1465s',price:68800,discount:30,stock:1,category_id:6,description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',store:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',image:'["image-46.jpg","image-46.jpg","image-46.jpg","image-46.jpg","image-46.jpg"]',createdAt: dateNow, updatedAt:dateNow},
              {name: 'Pedal de bombo',characteristics:'Pedal de Bombo Hebikuo G610 Cadena Doble base metalica',price:20000,discount:60,stock:1,category_id:6,description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',store:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',image:'["image-47.jpg","image-47.jpg","image-47.jpg","image-47.jpg","image-47.jpg"]',createdAt: dateNow, updatedAt:dateNow},
              {name: 'Bombo de Bateria',characteristics:'Bombo de Bateria Pearl Forum Fzh2218b/c 22x18',price:100000,discount:50,stock:1,category_id:6,description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',store:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',image:'["image-48.jpg","image-48.jpg","image-48.jpg","image-48.jpg","image-48.jpg"]',createdAt: dateNow, updatedAt:dateNow},
              {name: 'Set de Platillos',characteristics:'Set de platillos Zildjian Zp1418 Hi Hat 14 Cash 18 Palillos',price:25000,discount:30,stock:1,category_id:6,description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',store:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis',image:'["image-49.jpg","image-49.jpg","image-49.jpg","image-49.jpg","image-49.jpg"]',createdAt: dateNow, updatedAt:dateNow}
            ], {});
            console.log('Datos iniciales insertados con éxito.');

            await loadStatus.markAsInitialized(fileName);
        } catch (error) {
            console.error('Error al insertar datos iniciales:', error);
        }
    } else {
        console.log('La inicialización ya se ha realizado previamente.');
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};