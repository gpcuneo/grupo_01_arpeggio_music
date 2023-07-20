module.exports=(sequelize, DataType) =>{
    const alias = 'Sale';

    const cols = {
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        order_id:{
            type: DataType.INTEGER,
            allowNull:false
        },
        productcolor_id:{
            type:DataType.INTEGER,
            allowNull:false
        },
        quantity:{
            type:DataType.INTEGER,
            allowNull:false
        },
        price:{
            type:DataType.FLOAT,
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

    const config ={
        tableName:'sales',
        timestamps:true
    }

    const Sale = sequelize.define(alias, cols, config)

    Sale.associate= models=>{
        Sale.belongsTo(models.ProductColor,{
            as:'product-color',
            foreignKey:'productcolor_id'     //preguntar o avisar el nombre de la foreignkey
        });
        Sale.belongsTo(models.Order,{
            as:'orders',
            foreignKey:'order_id'
        })
    }

    return Sale;
}