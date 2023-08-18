const { response } = require('express');
const db = require('../database/models');
const { Op } = require('sequelize');
const Product = require('../database/models/Product');

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

const productList = (req, res)=>{
    db.Product.findAll({ include:[{association:'category'},{association:'trademark'}] ,nest:true})
    .then(reponse => {
        let array= reponse;
        let categories={};
        array.forEach( product => {
            if(categories.hasOwnProperty(product.category.name)){
                categories[product.category.name]++;
            }else{
                categories[product.category.name]=1;
            }

            if(!product.hasOwnProperty('detail')){
                product['detail']='/api/detail/:id'
            }
        });
        console.log(array);
        let data = {
            count:reponse.length,
            countByCategory:categories,
            products:reponse,
        }
        return res.json(data)
    })
}

const apiController = {
    getTowns: getTowns,
    checkEmail: checkEmail,
    productList:productList
}

module.exports = apiController;