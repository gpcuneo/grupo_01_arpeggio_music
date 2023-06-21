const {body} = require('express-validator');
const path = require('path'); 


const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('category').notEmpty().withMessage('Debes elegir una categoría'),
    body('price').notEmpty().withMessage('Tienes que escribir un precio'),
    body('stock').notEmpty().withMessage('Tienes que escribir el stock del producto'),
    body('colors').notEmpty().withMessage('Debes elegir un color'),
    body('characteristics').notEmpty().withMessage('Tienes que escribir las características del producto'),
    body('description').notEmpty().withMessage('Tienes que escribir la descripción del producto')
]

module.exports = validations;
