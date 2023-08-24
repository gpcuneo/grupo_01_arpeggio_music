const db = require('../database/models');
const { Op } = require('sequelize');
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
            item.dataValues.detail = url + route + item[field];
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
    return res.json(usersData);
}

const userDetail = async (req, res) => {
    const findUser = req.params.userName;
    let user = await db.User.findOne({
        where: {userName: findUser}
    });
    if(user){
        const urlBase = envs.APP_URL + ':' + envs.APP_PORT;
        user.dataValues.imageURL = urlBase + '/images/userProfile/' + user.image;
        delete(user.dataValues.id);
        delete(user.dataValues.password);
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
            products: addDetailRouteToObjects(products, '/product/', 'id')
        }
        return res.json(data)
    })
}

const addObjOfImage = (productDetail)=>{
    let product = productDetail;
    let arrayOfImages = JSON.parse(product.dataValues.image);
    let objImage= {};
    const url= envs.APP_URL+':'+ envs.APP_PORT;
    arrayOfImages.forEach((image,i) =>{
        objImage[i+1]= url +'/images/productos/'+image;
    })
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
        return res.json(data)
    })
}

const apiController = {
    getTowns: getTowns,
    checkEmail: checkEmail,
    userList: userList,
    userDetail:userDetail,
    productList:productList,
    productDetail:productDetail
}

module.exports = apiController;