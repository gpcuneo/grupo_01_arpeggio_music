const db = require('../database/models');
const Order = require('../models/order');
const Invoice = require('../models/invoice');
const { Op, fn, col } = require('sequelize');
require('dotenv').config();
const envs = process.env;


let getTowns = (req, res) => {
    db.Town.findAll({
        where: { id_province: req.params.id },
        attributes: ['id', 'name']
    }).then( (towns) => res.json(towns)
)}

const checkEmail = (req, res) => {
    db.User.findOne({
        where: { email: req.params.email },
        attributes: ['email']
    }).then( (email) => res.json(email)
)}

const addDetailRouteToObjects = (objList, route, field) => {
    const url = envs.APP_URL + ':' + envs.APP_PORT;
    return (objList.map( (item) => {
            item.dataValues.detail = 'http://' + url + route + item[field];
            return item
        })
    );
}

const userList = async (req, res) => {
    const limit = 3;
    let page = parseInt(req.query.page) || 1;
    page > 0 ? page-- : '';
    const offset = page * limit;
    let usersList = await db.User.findAll({
        limit,
        offset,
        attributes: ['userName', 'email'],
    });

    const usersCount = await db.User.count();
    const pageLimit = Math.ceil(usersCount / 3);
    const usersData = {
        users: addDetailRouteToObjects(usersList, '/user/', 'userName'),
        count: usersCount,
        currentPage: page + 1,
        totalPages: pageLimit,
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(usersData);
}

const userDetail = async (req, res) => {
    const findUser = req.params.userName;
    let user = await db.User.findOne({
        where: {userName: findUser}
    });
    if(user){
        const urlBase = envs.APP_URL + ':' + envs.APP_PORT;
        user.dataValues.img = 'http://' +urlBase + '/images/userProfile/' + user.image;
        user.dataValues.detail = 'http://' +urlBase + '/user/' + user.userName;
        delete(user.dataValues.id);
        delete(user.dataValues.password);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(user);
    } else {
        return res.status(404).json({user: `El usuario ${findUser} no existe`});
    }
}

const productList = async (req, res)=>{
    const limit = 2;
    let page= parseInt(req.query.page) || 1;
    page > 0? page--:'';
    let offset= page * limit;
    const countProducts= await db.Product.count();
    db.Product.findAll({ 
        include:[{association:'category'},{association:'trademark'}], 
        attributes:['id','name','characteristics'],
        limit,
        offset
    })
    .then(products => {
        let array= products;
        let categories={};
        array.forEach( product => {
            if(categories.hasOwnProperty(product.category.name)){
                categories[product.category.name]++;
            }else{
                categories[product.category.name]=1;
            }
        });
        const pageLimit= Math.ceil(countProducts/2);
        let data = {
            count:countProducts,
            countByCategory:categories,
            currentPage:page +1,
            totalPages: pageLimit,
            products: addDetailRouteToObjects(products, '/products/', 'id')
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(data)
    })
}

const addObjOfImage = (productDetail)=>{
    let product = productDetail;
    let arrayOfImages = JSON.parse(product.dataValues.image);
    let objImage= {};
    const url= envs.APP_URL+':'+ envs.APP_PORT;
    arrayOfImages.forEach((image,i) =>{
        objImage[i+1]= 'http://'+ url + '/images/productos/'+image;
    }) //localhost:
    delete(product.dataValues.image)
    delete(product.dataValues.category_id)
    delete(product.dataValues.trademark_id)
    product.dataValues.image= objImage;
    return product;
}
const productDetail= (req,res)=>{
    db.Product.findByPk(req.params.id,{include:[{association:'category'},{association:'trademark'}]})
    .then(detail =>{
        let data = {
            product:addObjOfImage(detail),
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(data)
    })
}

const categoryList = async (req, res) => {
    const limit = 3;
    let page = parseInt(req.query.page) || 1;
    page > 0 ? page-- : '';
    const offset = page * limit;
    let categoryList = await db.Category.findAll({
        limit,
        offset,
        attributes: ['id', 'name', 'img'],
    });

    const categoryCount = await db.Category.count();
    const pageLimit = Math.ceil(categoryCount / 3);
    const categoryData = {
        categories: addDetailRouteToObjects(categoryList, '/category/', 'id'),
        count: categoryCount,
        currentPage: page + 1,
        totalPages: pageLimit,
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(categoryData);
}

const categoryDetail = async (req, res) => {
    const categoryID = req.params.id;
    let category = await db.Category.findOne({
        where: {id: categoryID}
    });
    if(category){
        const urlBase = envs.APP_URL + ':' + envs.APP_PORT;
        category.dataValues.imageURL = urlBase + '/images/categories/' + category.img;
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(category);
    } else {
        return res.status(404).json({category: `El usuario ${categoryID} no existe`});
    }
}

const categoryProducts = async (req, res) => {
    let countProductsByCategories = await db.Product.findAll({
        attributes: ['category_id', [fn('COUNT', col('*')), 'count']],
        include: [ {association: 'category',
                    as: 'name',
                    attributes: ['name'],
                    }, ],
        group: ['category_id'],
        raw:true
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(countProductsByCategories);
}

// const totalPaymentsByUser = async (salesUsers) => {
//     const paymentsTotal = await salesUsers.map( async user => {
//         const orders = await Order.getOrdersPayed(user.user_id);
//         const payments = await orders.map( async order => {
//             const mount = await Invoice.getInvoiceByOrderID(order.id);
//             console.log(' --- Estoy en el map de mount')
//             console.log(mount)
//             return mount;
//         });
//         return payments
//     });

//     return paymentsTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// }

const totalPaymentsByUser = async (salesUsers) => {
    const paymentsTotal = await Promise.all(salesUsers.map(async (user) => {
        const orders = await Order.getOrdersPayed(user.user_id);
        const payments = await Promise.all(orders.map(async (order) => {
            const mount = await Invoice.getInvoiceByOrderID(order.id);
            return mount.total;
        }));
        return payments.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }));
    return paymentsTotal;
}


const getSalesDetails = async (req, res) => {
    let salesInfo = {}
    // obtener total de ventas
    const invoices = await db.Invoice.findAll();
    salesInfo.countInvoices = invoices.length;
    const mount = invoices.map( invoice => {
        return invoice.total;
    });
    salesInfo.maxInvoice = Math.max(...mount);
    salesInfo.totalInvoice = mount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const productsSales = await db.Sale.findAll();
    salesInfo.productsCount = productsSales.length;

    // cantidad de elementos vendidos
    const salesCount = await db.Sale.findAll({
        attributes: [
            [db.sequelize.fn('COUNT', db.sequelize.col('Sale.id')), 'count'],
            [db.sequelize.col('Sale.product_id'), 'product_id'],
        ],
        group: ['product_id'],
        order: [[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'DESC']],
        include: [
            {
                model: db.Product,
                as: 'product',
                attributes: ['name', 'price']
            },
        ],
        limit: 3,
    });
    salesInfo.topProducts = salesCount;

    // TOP de usuarios mas compradores:
    let salesUsers = await db.Order.findAll({
        attributes: [
            [db.sequelize.fn('COUNT', db.sequelize.col('Order.id')), 'count'],
            [db.sequelize.col('Order.user_id'), 'user_id'],
        ],
        where: {status: 'payed'},
        group: ['user_id'],
        order: [[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'DESC']],
        include: [
            {
                model: db.User,
                as: 'user',
                attributes: ['userName', 'image']
            },
        ],
        limit: 3,
    });
    const totalPaymentsUser = await totalPaymentsByUser(salesUsers)
    console.log(' --- TOTAL PAYMENTS DEL REDUCE:')
    console.log(totalPaymentsUser)
    for(let i=0; i<salesUsers.length; i++){
        console.log(salesUsers[i])
        console.log(totalPaymentsUser[i])
        salesUsers[i].dataValues.totalPayment = totalPaymentsUser[i];
    }
    //console.log(salesUsers)

    salesInfo.topUsers = salesUsers;
    

    return res.json(salesInfo);

}

const apiController = {
    getTowns: getTowns,
    checkEmail: checkEmail,
    userList: userList,
    userDetail:userDetail,
    productList:productList,
    productDetail:productDetail,
    categoryList: categoryList,
    categoryDetail:categoryDetail,
    categoryProducts:categoryProducts,
    getSalesDetails: getSalesDetails,
}

module.exports = apiController;