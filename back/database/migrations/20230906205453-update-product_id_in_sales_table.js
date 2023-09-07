'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar la restricción de clave externa en productcolor_id
    await queryInterface.removeConstraint('sales', 'sales_ibfk_2');

    // Cambiar el nombre de la columna productcolor_id a product_id
    await queryInterface.renameColumn('sales', 'productcolor_id', 'product_id');

    // Establecer una nueva restricción de clave externa en product_id
    await queryInterface.addConstraint('sales', {
      fields: ['product_id'],
      type: 'foreign key',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'CASCADE', // Puedes ajustar esto según tus necesidades
      onUpdate: 'CASCADE', // Puedes ajustar esto según tus necesidades
      name: 'sales_product_id_fkey', // Un nombre para la restricción
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la restricción de clave externa en product_id
    await queryInterface.removeConstraint('sales', 'sales_product_id_fkey');

    // Cambiar el nombre de la columna product_id a productcolor_id
    await queryInterface.renameColumn('sales', 'product_id', 'productcolor_id');

    // Establecer la restricción de clave externa nuevamente en productcolor_id
    await queryInterface.addConstraint('sales', {
      fields: ['productcolor_id'],
      type: 'foreign key',
      references: {
        table: 'product-color',
        field: 'id',
      },
      onDelete: 'CASCADE', // Puedes ajustar esto según tus necesidades
      onUpdate: 'CASCADE', // Puedes ajustar esto según tus necesidades
      name: 'sales_productcolor_id_fkey', // Un nombre para la restricción
    });
  },
};