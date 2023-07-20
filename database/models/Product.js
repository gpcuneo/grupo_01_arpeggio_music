module.exports = (sequelize, DataType) =>{
    const alias = 'Product';

    const cols = {
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        name:{
            type:DataType.STRING(35),
            allowNull:false
        },
        characteristics:{
            type:DataType.STRING(150),
            allowNull:false
        },
        price:{
            type:DataType.FLOAT,
            allowNull:false
        },
        discount:{
            type:DataType.FLOAT,
            allowNull:false
        },
        category_id:{
            type:DataType.INTEGER,
            allowNull:false
        },
        description:{
            type:DataType.TEXT,
            allowNull:false
        },
        store:{
            type:DataType.TEXT,
            allowNull:true
        },
        image:{
            type:DataType.STRING(255),
            allowNull:false
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
        tableName:'products',
        timestamps:true,
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models =>{
        /* Product.belongsTo(models.Category,{
            as:'category',
            foreignKey:'category_id'
        }) */
        Product.belongsToMany(models.Color,{
            as:'colors',
            through:'product-color',
            foreignKey:'product_id',
            otherKey:'color_id',
            timestamps:true
        })
    }

    return Product;
}