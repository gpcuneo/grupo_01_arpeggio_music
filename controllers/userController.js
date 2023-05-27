// dummy data
const jsonTools = require('../utils/JSONTools')

let userList = jsonTools.read('users.json');
let orderHistory = jsonTools.read('horderHistory.json');

// Creamos las funciones que seran los metodos del controlador de usuarios.
const showUser = (req, res) => {
    if(req.params.id) { // Si en la peticion viene el parametro id lo imprimimos por consola
        console.log(req.params.id)
    }
    const id = parseInt(req.params.id)
    let userInfo = {}
    userList.forEach( user => user['id'] === id ? userInfo = user : '');
    console.log(userInfo)
    res.render('userProfile', {'userInfo': userInfo, 'orderHistory': orderHistory} );
}

const listUsers = (req, res) => {
    res.render('userList', {'users': userList} );
}

const register = (req, res) => {
    res.render('userRegister');
}

const update = (req, res) => {
    res.render('userRegister');
}

const login = (req, res) => {
    res.render('userLogin');
}

// Declaramos el objeto userController el cual tendra metodos que invocaran a funciones
const userController = {
    show: listUsers,
    showByID: showUser,
    login: login,
    register: register,
    // create: '',
    update: update,
    // delete: '',
}

// exportamos el modulo.
module.exports = userController;