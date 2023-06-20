const loggerMiddleware = require('./loggerMiddleware');
const authenticationMiddleware = require('./authenticationsMiddleware');
const authorizationMiddleware = require('./authorizationMiddleware');

module.exports = {
    loggerMiddleware,
    authenticationMiddleware,
    authorizationMiddleware,
}