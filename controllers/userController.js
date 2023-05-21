// dummy data
const userList = [
    {id: '1', name: 'Andres Lautaro', lastName: 'Gonzalez', email: 'andreslautarogonzalez@gmail.com', address: 'Pastor Luna 6919', city: 'Martin Coronado', dni: '33.333.333', phone: '15-5555-5555'},
    {id: '2', name: 'Norma Lorena', lastName: 'Perez', email: 'norma.perez@hotmail.com', address: 'Av. Corrientes 2355', city: 'Almagro', dni: '33.333.333', phone: '15-5555-5555'},
    {id: '3', name: 'Julio Estaban', lastName: 'Martins', email: 'jemartins@outlook.com.ar', address: 'Aviador Rohland 2323', city: 'El Palomar', dni: '33.333.333', phone: '15-5555-5555'},
    {id: '4', name: 'Maria Laura ', lastName: 'Acevedo', email: 'marialacevedo@gmail.com', address: 'Campo de Mayo 8215', city: 'Loma Hermosa', dni: '33.333.333', phone: '15-5555-5555'},
    {id: '5', name: 'Jose Pedro', lastName: 'Lopez', email: 'jplopez90@hotmail.com', address: 'Sandra Pisano 3575', city: 'Haedo', dni: '33.333.333', phone: '15-5555-5555'}
]

const orderHistory = [
    {id: '1342', date: '3/1/2020', mount: '45726', status: 'Entregado'},
    {id: '2321', date: '5/2/2021', mount: '75982', status: 'Cancelado'},
    {id: '3543', date: '6/3/2022', mount: '101357', status: 'Cargado'},
    {id: '4776', date: '8/4/2023', mount: '275384', status: 'Facturado'},
    {id: '5321', date: '5/5/2021', mount: '329374', status: 'Enviado'}
]


// Creamos las funciones que seran los metodos del controlador de usuarios.
const showUser = (req, res) => {
    if(req.params.id) { // Si en la peticion viene el parametro id lo imprimimos por consola
        console.log(req.params.id)
    }
    const id = req.params.id
    let userInfo = {}
    userList.forEach( user => user['id'] === id ? userInfo = user : '');
    console.log(userInfo)
    res.render('userProfile', {'userInfo': userInfo, 'orderHistory': orderHistory} );
}

const listUsers = (req, res) => {
    res.send('ok')

    // Renderizamos la vista
    //res.render('userProfile', {'userList': userList} );
}

// Declaramos el objeto userController el cual tendra metodos que invocaran a funciones
const userController = {
    show: listUsers,
    showByID: showUser,
    // create: '',
    // update: '',
    // delete: '',
}

// exportamos el modulo.
module.exports = userController;