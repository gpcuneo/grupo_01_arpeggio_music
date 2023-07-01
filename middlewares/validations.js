const {body} = require('express-validator');
//const path = require('path'); 

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


const validations = {
    userFields: userFields,
}

module.exports = validations;
















