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
            await queryInterface.bulkInsert('users', [
              {id: '01cd1e41-d56a-4190-a463-35032ffc9dcf', userName:'test01test01', firstName:'test', lastName: 'test', email: 'test@test.test', address:'test de test 123', id_town:4, id_rol:1, dni:90999999, phone:15678678, password:'$2a$10$9JM.WYGDVbEmD.6q/gk7.eJbngzTLP9oWmPG4Azn1n2P3/x.WC6W6', active:0, lastIP:'172.27.0.1', image:'default.avif', createdAt: dateNow, updatedAt: dateNow, id_province:1},
              {id: '0f7023ba-6304-44b9-8e33-17b559cead7b', userName:'test04test04', firstName:'testdetest', lastName: 'testestets', email: 'test04test04@test04test04.com', address:'Alguna 1234', id_town:282, id_rol:1, dni:80808808, phone:1156728376, password:'$2a$10$NlbVl9UGYvTDA1J4Dyhi8OZjyPMRh4hjeEwUBf3iR2WWpIuBj7A0C', active:1, lastIP:'172.28.0.1', image:'default.avif', createdAt: dateNow, updatedAt: dateNow, id_province:3},
              {id: '32de8d81-c77c-4c9f-bf68-a13ee6d848ef', userName:'jvilla00', firstName:'Juan Pablo', lastName:'Villa', email: 'jvilla@gmail.com', address:'Alguna 123', id_town:1, id_rol:1, dni:20200200, phone:1145432345, password:'$2a$10$lRu9SCaPIzj2WNoY6kqSpOUTNTPuQMa4og1P6kToEA9XYrHOmkFp2', active:1, lastIP:'172.27.0.1', image:'1689955352182-Captura de pantalla 2023-05-14 a la(s) 18.21.36.png', createdAt: dateNow, updatedAt: dateNow, id_province:1},
              {id: '8755d1a5-0908-4608-8837-cc27f3cf3224', userName:'usertest01', firstName:'usertest', lastName: 'usertest', email: 'usertest01@usertest01.com', address:'usertest01 1234', id_town:3, id_rol:1, dni:90909909, phone:1178763562, password:'$2a$10$RCn53oCTl6ot0k2.NQNrFuk3E9Jn3PUWLXh1WDxQEaOLoj/o5YLKO', active:1, lastIP:'172.28.0.1', image:'1689968195703-descarga.jpeg', createdAt: dateNow, updatedAt: dateNow, id_province:1},
              {id: 'b3b91cc1-4f6a-4bb5-bd2f-20d3925ef59e', userName:'cosmefulanito', firstName:'Cosme', lastName: 'Fulanito', email:'cosme.fulanito@hotmail.com',address: 'San Lorenzo 123', id_town:212, id_rol:1, dni:30135790, phone:1167873923, password:'$2a$10$OEOgKoxA5Pi0nkqw5hiSkO7ZMBm38GUikYotxIF8CsCrpWRjdwW72', active:1, lastIP:'172.18.0.1', image:'1687041478406-200112anonymous.jpeg', createdAt: dateNow, updatedAt: dateNow, id_province:1},
              {id: 'd72f98b1-dbb2-41d8-88e1-9c0e8eb4fc7c', userName:'pepegrillo', firstName:'Pepe', lastName: 'Grillo', email: 'pepe.grillo@gmail.com', address:'Calle falsa 123', id_town:5, id_rol:2, dni:30333303, phone:1134879328, password:'$2a$10$alxXME9Q.ot51jTDmhzdJuAHXumUXgqvOmHpy0u7O7dQUGGDTr1me', active:1, lastIP:'172.27.0.1', image:'1687041398999-slow_internet.jpeg', createdAt: dateNow, updatedAt: dateNow, id_province:1},
              {id: 'f5431d56-a2c6-470d-9f88-90eb8621b323', userName:'arodriguez', firstName:'Andrea', lastName: 'Rodriguez', email: 'arodriguez@outlook.com', address:'Alguna Calle 1234', id_town:14, id_rol:1, dni:30123123, phone:1147568902, password:'$2a$10$abzCDSfHT3pVUtnpFPKvD.PzoUE.NeVw8JwfeefimcfOg.5ccT8hu', active:1, lastIP:'172.18.0.1', image:'1687041556551-5652.jpg', createdAt: dateNow, updatedAt: dateNow, id_province:1}
            ], {});
            console.log('Datos iniciales insertados con éxito.');            // Marca como inicializado para que no se vuelva a ejecutar
            
            await loadStatus.markAsInitialized(fileName);
        } catch (error) {
            console.error('Error al insertar datos iniciales:', error);
        }
    } else {
        console.log('La inicialización ya se ha realizado previamente.');
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
