const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const ExcelJS = require('exceljs');
const fs = require('fs');
const jsonTools = require('../utils/JSONTools');
const netTools = require('../utils/networkTools');
const userTools = require('../utils/User');
const db = require('../database/models');
const { Op, INTEGER } = require('sequelize');
const {validationResult} = require('express-validator');
const { log } = require('console');
const { off } = require('process');
const { query } = require('express');
//const Order = require('../database/models/Order');


//let orderHistory = jsonTools.read('horderHistory.json');

const createUserObject = (req) => {
    return {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        emailValidated: req.body.emailValidated,
        address: req.body.address,
        id_province: parseInt(req.body.city),
        id_town: parseInt(req.body.town),
        dni: parseInt(req.body.dni),
        phone: parseInt(req.body.phone),
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        active: true,
        lastIP : netTools.getUserIP(req)
    }
}

const comparePassword = (user) => {
    let result = user.password === user.confirmPassword ? true : false;
    return result;
}

const validateUserFields = async (user, req, id=false) => {
    let errors = validationResult(req).mapped();
    if(id) { 
        delete errors.password
    } else {
        comparePassword(user) ? '' : errors.password = {msg :'Las contrasenas no coinciden'};
    }
    await db.User.findOne({where: {userName : user.userName, id: {[Op.ne]: id}}}) ? errors.dni = {msg : 'El DNI ya se encuentra registrado'} : '' ;
    await db.User.findOne({where: {dni : user.dni, id: {[Op.ne]: id}}}) ? errors.userName = {msg : 'El nombre de usuario ya fue usado'} : '' ;
    await db.User.findOne({where: {email : user.email, id: {[Op.ne]: id}}}) ? errors.email = {msg : 'El email ya se encuentra registrado'} : '' ;
    user.city === 0 ? errors.city = {msg : 'Seleccione una provincia valida'} : '' ;
    user.town === 0 ? errors.town = {msg : 'Selecciona una localidad valida'} : '' ;
    // Query mas eficiente pero no puedo controlar el mensaje de error por campo.
    // const users = await db.User.findAll({
    //     where: {
    //         [Op.or]: [
    //             { dni: user.dni},
    //             { userName: user.userName}, 
    //             { email: user.email},
    //         ],
    //     }, 
    //     });
    return errors 
}

// async function getOrderHistory(userId) {
//     console.log(userId)
//     try {
//         const orderHistory = await db.Order.findAll({
//             where: { user_id: userId },
//             include: [
//                 {
//                     model: db.Invoice,
//                     as: 'Invoice',
//                     where: {order_id: 13},
//                     attributes: ['total'], // Incluye solo el campo 'mount' de la factura
//                 },
//                 {
//                     model: db.Shipping,
//                     as: 'Shipping',
//                     where: {order_id: 13},
//                     attributes: ['status'], // Incluye solo el campo 'status' del envío
//                 }
//             ],
//         });
//         if (orderHistory) {
//             console.log(orderHistory)
//             return orderHistory;
//         } else {
//             return null; // El usuario no existe o no tiene pedidos asociados
//         }
//     } catch (error) {
//         console.error('Error al obtener la información del pedido:', error);
//         throw error;
//     }
// }

// const getInvoice = async (order_id) => {
//     const invoice = await db.Invoice.findOne({
//         where: { order_id: order_id },
//     });
//     return invoice.toJSON();
// }

// const getShipping = async (order_id) => {
//     console.log(order_id)
//     const shipping = await db.Shipping.findOne({
//         where: { order_id: order_id },
//     });
//     return shipping.toJSON();
// }

// async function getOrderHistory(userId) {
//     try {
//         const qq = `select distinct (ord.id), ord.id, ord.status, inv.total, ship.status, ord.createdAt from orders ord
//         join invoices inv ON inv.order_id = ord.id
//         join shippings ship ON ship.order_id = ord.id
//         where ord.status = 'payed'
//         and ord.user_id = '${userId}'
//         and inv.total != 0
//         ;`
//         console.log(qq);

//         const ordersHistory = await db.sequelise.query(qq, { type: Sequelize.QueryTypes.SELECT });
//         //console.log(metadata)
//         console.log(ordersHistory)
//         if (ordersHistory) {
//             return ordersInvoices;
//         } else {
//             return null; // El usuario no existe o no tiene pedidos asociados
//         }
//     } catch (error) {
//         console.error('Error al obtener la información del pedido:', error);
//         throw error;
//     }
// }

const getOrderHistory_v2 = async (userId) => {
    try {
        const orders = await db.Order.findAll({
            attributes: [
                [db.sequelize.fn('DISTINCT', db.sequelize.col('id')), 'id'],
                'status',
                'createdAt',
            ],
            where: {
                status: 'payed',
                user_id: 'd72f98b1-dbb2-41d8-88e1-9c0e8eb4fc7c',
            },
            // include: [
            //     {
            //         model: db.Invoice,
            //         attributes: ['total'],
            //         as: 'Invoice',
            //         where: {
            //         total: {
            //             [Op.ne]: 0,
            //         },
            //         },
            //     },
            //     {
            //         model: db.Shipping,
            //         as: 'Shipping',
            //         attributes: ['status'],
            //     },
            // ],
        });
        console.log(orders)
        if (orders) {
            let results = orders.map(order => {
                return {
                    id: order.id,
                    status: order.status,
                    total: order.Invoice ? order.Invoice.total : null,
                    shippingStatus: order.Shipping ? order.Shipping.status : null,
                    createdAt: order.createdAt ? order.createdAt : null,
                };
            });

            for(let i=0; i < results.length; i++) {
                const invoice = await db.Invoice.findOne({
                    where: {order_id: results[i].id},
                    attributes: ['total']
                });
                results[i].total = invoice.total;
            }

            for(let i=0; i < results.length; i++) {
                const shipping = await db.Shipping.findOne({
                    where: {order_id: results[i].id},
                    attributes: ['status']
                });
                results[i].shippingStatus = shipping.status;
            }

            console.log('results')
            console.log(results)

            return results;
        } else {
            return null;
        }
        } catch (error) {
            console.error('Error al obtener la información del pedido:', error);
            throw error;
        }
}


const formatDate = (orderHistory) => {
    const timeZone = "America/Argentina/Buenos_Aires";
    const formatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timeZone,
        timeZoneName: "short"
    };

    for(let i=0; i<orderHistory.length; i++) {
        console.log(orderHistory[i].createdAt);
        const originalDate = new Date(orderHistory[i].createdAt);
        const strDate = originalDate.toLocaleString("es-AR", formatOptions);
        console.log(strDate)
        orderHistory[i].date = strDate
    }
    return orderHistory;
}

const showUser = async (req, res) => {
    //const userInfo = userTools.isLogged(req);
    const user = await db.User.findOne({
                                where: { userName: req.params.userName },
                                include: [
                                    {association: 'Town', as: 'town'},
                                    {association: 'Province', as: 'province'},
                                ]
                            });
    const orderHistory = await getOrderHistory_v2(user.id); 
    const orderHistoryFormated = formatDate(orderHistory);
    console.log(orderHistoryFormated)
    res.render('User/profile', {'user': user, 'orderHistory': orderHistoryFormated} );
}

const listUsers = async (req, res) => {
    const userInfo = userTools.isLogged(req);
    const limit = 3;
    let pageLimit = 0
    const page = parseInt(req.query.page) || 0;
    const offset = page * limit;
    const searchData = req.query.searchData;
    const searchField = req.query.searchField;

    let query = {
        limit,
        offset,
        include: [
            {association: 'Town', as: 'town'},
            {association: 'Province', as: 'province'},
            ]
        };
    if(searchField && searchData) {
        searchField === 'userName' ? query['where'] = { userName: { [Op.like]: `%${searchData}%` } } : '';
        searchField === 'lastName' ? query['where'] = { lastName: { [Op.like]: `%${searchData}%` } } : '';
        searchField === 'dni' ? query['where'] = { dni: { [Op.like]: `%${parseInt(searchData)}%` } } : '';
    }
    users = await db.User.findAll(query);
    if(searchField && searchData) {
        pageLimit = Math.ceil(users.length / 3) -1; 
    } else {
        usersCount = await db.User.count();
        pageLimit = Math.ceil(usersCount / 3) -1; 
    }
    return res.render('User/list', {users, user: userInfo, page, pageLimit});
}

const registerUser = async (req, res) => {
    if(userTools.isLogged(req)) {
        res.redirect('/')
    } else {
        const provinces = await db.Province.findAll({attributes: ['id', 'name']});
        res.render('User/register', {'user': false, 'errors': false, 'action': 'register', provinces});
    }
}

const createUser = async (req, res) => {
    let user = createUserObject(req);
    errors = await validateUserFields(user, req);
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        const provinces = await db.Province.findAll({attributes: ['id', 'name']});
        const towns = await db.Town.findAll({
            where: {id_province: user.id_province},
            attributes: ['id', 'name']}
        );
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'register', provinces, towns});
    } else {
        user.id = uuid.v4();
        user.image = 'default.avif';
        user.id_rol = 1
        user.password = bcrypt.hashSync(user.password, 10);
        delete(user.confirmPassword);
        db.User.create(user);
        console.log('Usuario creo el usuario: ' + user.userName);
        res.redirect ('/user/' + user.userName);
    }
}

const editUser = async (req, res) => {
    let user = await db.User.findOne({where: {userName: req.params.userName}})
    delete(user.id)
    delete(user.password)
    delete(user.confirmPassword)
    const provinces = await db.Province.findAll({attributes: ['id', 'name']});
    const towns = await db.Town.findAll({
        where: {id_province: user.id_province},
        attributes: ['id', 'name']}
    );
    res.render('User/register', {'user': user, 'errors': false, 'action': 'update', provinces, towns});
}

const updateUser = async (req, res) => {
    let user = createUserObject(req);
    let userID = await db.User.findOne({
        where: {userName: req.params.userName},
        attributes: ['id']
    });
    errors = await validateUserFields(user, req, userID.id);
    if (Object.keys(errors) != 0) {
        console.log(' --- hay errores', errors);
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'update'});
    } else {
        delete user.password;
        await db.User.update(user, {
            where: { id: userID.id },
            returning: false
        });
        console.log('Usuario actualizado: ' + user.userName);
        res.redirect ('/user/' + user.userName);
    }
}

const updatePassword = async (req, res) => {
    let userName = req.params.userName;
    if(req.body.password === req.body.confirmPassword) {
        let userID = await db.User.findOne({
            where: {userName: userName},
            attributes: ['id']
        });
        let user = {}
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.lastIP = netTools.getUserIP(req);
        await db.User.update(user, {
            where: { id: userID.id },
            returning: false
        });
        console.log('Se actualizo el password del usuario: ' + userName );
    }
    res.redirect ('/user/' + userName);
}

const userDelete = async (req, res) => {
    let userName = req.params.userName;
    let user = await db.User.findOne({where:{ userName: userName}})
    res.render('User/delete', {'user': user});
}

const changeStatus = async (req, res) => {
    let userName = req.params.userName;
    let status = await db.User.findOne({
        where: {userName: userName},
        attributes: ['active']
    });
    await db.User.update({ active: !status.active }, {
        where: { userName: userName },
        returning: false
    });
    console.log('Se Modifico el estado del usuario: ' + userName);
    res.redirect('/');
}

const login = (req, res) => {
    if(userTools.isLogged(req)) {
        res.redirect('/');    
    } else {
        res.render('User/login', {'user': false, 'error': false});
    }
}

const userLogin = async (req, res) => {
    userName = req.body.userName;
    let user = await db.User.findOne({where: {userName: req.body.userName}})
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password) && user.active){
            console.log('Se logueo el usuario: ' + userName);
            if(!!req.body.remember) {
                res.cookie('userName', user.userName, {
                    maxAge: 1000 * 60 * 60 * 24 * 30
                });
            }
            delete user.id;
            delete user.password;
            req.session.user = user;
            res.redirect('/');
        } else {
            console.log('Error de login: ' + userName);
            res.render('User/login', {'user': user, 'error': true});
        }
    } else {
        console.log('userName error: ' + userName);
        res.render('User/login', {'user': user, 'error': true});
    }
}

const signOut = (req, res) => {
    res.clearCookie('userName');
    console.log('userName error: ' + req.session.user.userName);
    delete req.session.user;
    res.redirect('/');
}

const uploadImage = async (req, res) => {
    let userName = req.params.userName;
    let img = { image: req.file.filename}
    await db.User.update(img, {
        where: { userName: userName },
        returning: false
    });
    console.log('Se actualizo la imagen del usuario: ' + userName);
    res.redirect ('/user/'+userName);
}

const exportUserlist = async (req, res) => {
    try {
        // Realiza el findAll() para obtener los datos de la tabla User
        const columns = ['userName', 'firstName', 'lastName', 'email', 'dni', 'phone', 'address', ];
        const users = await db.User.findAll();
        // Crea un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();

        // Crea una nueva hoja en el libro
        const worksheet = workbook.addWorksheet('Usuarios');

        // Crea el encabezado de la hoja con los nombres de las columnas
        worksheet.addRow(columns);

        // Agrega los datos de los usuarios a la hoja
        users.forEach((user) => {
            const values = columns.map((column) => user[column]);
            worksheet.addRow(values);
        });

        // Crea un stream para guardar el archivo Excel
        const tempFileName = 'usuarios.xlsx';
        const stream = fs.createWriteStream(tempFileName);
        await workbook.xlsx.write(stream);

        // Configura la respuesta para descargar el archivo
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');

        // Envía el archivo Excel como respuesta
        const fileStream = fs.createReadStream(tempFileName);
        fileStream.pipe(res);

        // Elimina el archivo temporal después de enviarlo
        fileStream.on('end', () => {
            fs.unlinkSync(tempFileName);
        });

        console.log('Archivo Excel generado correctamente:', tempFileName);
    } catch (error) {
        console.error('Error al generar el archivo Excel:', error);
    }
};


const userController = {
    show: listUsers,
    showByID: showUser,
    login: login,
    logout: signOut,
    auth: userLogin,
    register: registerUser,
    create: createUser,
    edit: editUser,
    updateInfo: updateUser,
    updatePwd: updatePassword,
    updateImage: uploadImage,
    delete: userDelete,
    disable: changeStatus,
    enable: changeStatus,
    export: exportUserlist,
}

module.exports = userController;