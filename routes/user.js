const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const middlewares = require('../middlewares/index');
const isAdmin = middlewares.authorizationMiddleware.isAdmin;
const isOwnerOrAdmin = middlewares.authorizationMiddleware.isOwnerOrAdmin;
const isOwner = middlewares.authorizationMiddleware.isOwner;
const validateUserFields = middlewares.validations.userFields;

const storageFile = require('../utils/storageTools')
const upload = storageFile.upload('userProfile');

router.get('/login', userController.login);
router.post('/login', userController.auth);
router.get('/:userName/logout', isOwner, userController.logout);
router.get('/register', validateUserFields, userController.register);
router.get('/export', isAdmin, userController.export);
router.get('/:userName/edit', isOwnerOrAdmin, userController.edit);
router.get('/:userName/delete', isOwnerOrAdmin, userController.delete);
router.post('/:userName/active', isOwnerOrAdmin, userController.enable);
router.delete('/:userName', isOwnerOrAdmin, userController.disable);
router.put('/:userName', isOwnerOrAdmin, validateUserFields,userController.updateInfo);
router.put('/:userName/password', isOwnerOrAdmin, userController.updatePwd);
router.put('/:userName/image', isOwnerOrAdmin, upload.single('userimage'), userController.updateImage);
router.get('/:userName', isOwnerOrAdmin, userController.showByID);
router.post('/', userController.create);
router.get('/', isAdmin, userController.show);

// exportamos el modulo
module.exports = router;