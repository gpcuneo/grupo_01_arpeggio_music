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
        product_id:{
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
        Sale.belongsTo(models.Product,{
            as:'product',
            foreignKey:'product_id'     //preguntar o avisar el nombre de la foreignkey
        });
        Sale.belongsTo(models.Order,{
            as:'orders',
            foreignKey:'order_id'
        })
    }

    return Sale;
}