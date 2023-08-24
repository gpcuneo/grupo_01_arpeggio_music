const expressValidator = require ('express-validator')

const validation = {
    validateCreateCategory :[
        expressValidator.body('name')
        .notEmpty()
        .withMessage('campo obligatorio')
    ]
}

module.exports = validation