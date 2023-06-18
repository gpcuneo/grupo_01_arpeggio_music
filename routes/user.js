const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const storageFile = require('../utils/storageTools')
const upload = storageFile.upload('userProfile');

router.get('/login', userController.login);
router.post('/login', userController.auth);
router.get('/register', userController.register);
router.get('/export', userController.export);
router.get('/:id/edit', userController.edit);
router.get('/:id/delete', userController.delete);
router.post('/:id/active', userController.enable);
router.delete('/:id', userController.disable);
router.put('/:id', userController.updateInfo);
router.put('/:id/password', userController.updatePwd);
router.put('/:id/image', upload.single('userimage'), userController.updateImage);
router.get('/:id', userController.showByID);
router.post('/', userController.create);
router.get('/', userController.show);

// exportamos el modulo
module.exports = router;