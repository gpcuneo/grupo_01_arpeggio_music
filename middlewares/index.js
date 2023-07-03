const loggerMiddleware = require('./loggerMiddleware');
const authenticationMiddleware = require('./authenticationsMiddleware');
const authorizationMiddleware = require('./authorizationMiddleware');
//const validations = require('./validateCreateProductMiddleware');
const validations = require('./validations');

module.exports = {
    loggerMiddleware,
    authenticationMiddleware,
    authorizationMiddleware,
    validations,
}