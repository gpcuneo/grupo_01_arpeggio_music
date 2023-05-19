// Creamos las funciones que seran los metodos del controlador de usuarios.
const showUser = (req, res) => {
    if(req.params.id) { // Si en la peticion viene el parametro id lo imprimimos por consola
        console.log(req.params.id)
    }
    // Renderizamos la vista
    res.render('userProfile');
}

// Declaramos el objeto userController el cual tendra metodos que invocaran a funciones
const userController = {
    show: showUser,
    // show: '',
    // create: '',
    // update: '',
    // delete: '',
}

// exportamos el modulo.
module.exports = userController;