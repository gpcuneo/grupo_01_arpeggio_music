const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/:id/edit', userController.edit);
router.get('/:id/delete', userController.delete);
router.post('/:id/active', userController.enable);
router.delete('/:id', userController.disable);
router.put('/:id', userController.update);
router.get('/:id', userController.showByID);
router.post('/', userController.create);
router.get('/', userController.show);

// exportamos el modulo
module.exports = router;