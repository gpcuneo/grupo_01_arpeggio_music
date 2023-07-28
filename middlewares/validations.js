const {body} = require('express-validator');

const userFields = [
    body('userName').trim().notEmpty().isLength({ min: 8}).withMessage('El usuario debe tener minimo 8 caracteres'),
    body('firstName').trim().notEmpty().matches(/^[A-Za-z\s]+$/).withMessage('Por favor ingrese un nombre valido'),
    body('lastName').trim().notEmpty().matches(/^[A-Za-z\s]+$/).withMessage('Por favor ingrese un apellido valido'),
    body('email').trim().notEmpty().isEmail().withMessage('Por favor ingrese una cuenta de correo valida'),
    body('address').trim().notEmpty().withMessage('Por favor revise este campo'),
    body('city').trim().notEmpty().withMessage('Por favor revise este campo'),
    body('dni').trim().notEmpty().isInt().withMessage('Solo se admiten numeros'),
    body('phone').trim().notEmpty().withMessage('Por favor revise este campo'),
    body('password').trim().notEmpty().isLength({ min: 8}).withMessage('Por favor revise este campo'), 
    body('confirmPassword').trim().trim().custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('password not eqaul to confirm password')
        }
        return true; 
    })
]

const productFields = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('category').notEmpty().withMessage('Debes elegir una categoría'),
    body('price').notEmpty().withMessage('Tienes que escribir un precio'),
    body('stock').notEmpty().withMessage('Tienes que escribir el stock del producto'),
    body('colors').notEmpty().withMessage('Debes elegir un color'),
    body('characteristics').notEmpty().withMessage('Tienes que escribir las características del producto'),
    body('description').notEmpty().withMessage('Tienes que escribir la descripción del producto'),
    body('img').custom((value,{req})=>{
        let files = req.files;
        if(files.length == 0){
            throw new Error('Tienes que subir como mínimo una imagen');
        }
        return true;
    })
]

const categoryFields = [
    body('name').notEmpty().withMessage('campo obligatorio')
]

const validations = {
    userFields: userFields,
    productFields:productFields,
    categoryFields: categoryFields,
}

module.exports = validations;
















