// En el archivo del rutas de usuario imoportamos express para poder hacer uso del metodo .Router
const express = require('express');
// Invocamos al metodo Router
const router = express.Router();
// Y requerimos el controlador de usuarios (creado por nosotros).
const userController = require('../controllers/userController')

// Definimos que todo lo que llegue a la raiz de usuario o sea http://arpegio.com.ar/user se envie
// al metodo index del controlador de usuario y declaramos un parametro dinamico de nombre id
// mediant el uso de ? indicamos que este parametro es dinamico, puede o no venis en la peticion
router.use('/login', userController.login);
router.get('/register', userController.register);
router.post('/register', userController.create);
router.get('/:id/edit', userController.edit);
router.put('/:id/edit', userController.update);
router.get('/:id', userController.showByID);
router.put('/:id', userController.update);
router.use('/', userController.show);

// exportamos el modulo
module.exports = router;