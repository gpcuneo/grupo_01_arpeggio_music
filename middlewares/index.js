const loggerMiddleware = require('./loggerMiddleware');
const authenticationMiddleware = require('./authenticationsMiddleware');
const authorizationMiddleware = require('./authorizationMiddleware');
const validations = require('./validateCreateProductMiddleware');

module.exports = {
    loggerMiddleware,
    authenticationMiddleware,
    authorizationMiddleware,
    validations,
}