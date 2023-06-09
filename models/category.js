const fs = require('fs');
const path = require('path');

const model = {
    // Ruta del archivo JSON
    route: '../data/category.json',

    // Traer todos los productos
    findAll: function () {
        const categoryJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');

        const categorys = JSON.parse(categoryJSON);

        return categorys;
    },

    // Traer un producto según su ID
    findById: function (id) {
        const categorys = this.findAll();

        let buscado = categorys.find(category=> category.id === id);

        if (!buscado) {
            buscado = null;
        }

        return buscado;
      
    },

    // Eliminar un producto
    deleteById: function (id) {
        let categorys = this.findAll();

        categorys = categorys.filter(category => category.id !== id);

        const productsJSON = JSON.stringify(categorys);

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

        return categorys;
    },

    // Editar un producto
    updateById: function (id, newData) {
        // Buscamos el array de productos
        let categorys = this.findAll();

        // Con el findIndex, buscamos en qué indice del array de productos, está guardado el elemento buscado
        const indice = categorys.findIndex(categoriaActual => categoriaActual.id === id);

        // Actualizamos los datos del producto que corresponda, con los datos que nos pasaron por parámetros
        categorys[indice].title = newData.title;
        categorys[indice].price = newData.price;

        // Convertimos nuestro array de JS a un array de JSON
        const categoryJSON = JSON.stringify(categorys);

        // Guardamos este nuevo array de JSON en el archivo correspondiente
        fs.writeFileSync(path.join(__dirname, this.route), categoryJSON);

        return categorys;
    },

    // Agregar un producto nuevo
    createOne: function (nuevaCategoria) {
        // Buscamos todos los productos
        let categorys = this.findAll();

        // Le damos el ID al producto nuevo
        nuevaCategoria.id = categorys[categorys.length - 1].id + 1;

        // Agregamos el producto nuevo al array original
        categorys.push(nuevaCategoria);

        // Convertimos a JSON el array
        const categorysJSON = JSON.stringify(categorys);

        // Sobreescribimos el JSON
        fs.writeFileSync(path.join(__dirname, this.route), categorysJSON);
    }
}

module.exports = model;