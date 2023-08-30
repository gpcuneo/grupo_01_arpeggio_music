const Product = require('./Product');
const User = require('./User');

module.exports = (sequelize, DataType)=>{
    const alias = 'Cart';

    const cols = {
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        userid: {
            type: DataType.CHAR(36),
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        productid: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
        quantity: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
        }
    }

    const config = {
        tableName: 'carts',
        timestamps: true,
    }

    let Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {as:'User', foreignKey: 'userid'});
        Cart.belongsTo(models.Product, {as:'Product', foreignKey: 'productid'});
    }
    return Cart
}

