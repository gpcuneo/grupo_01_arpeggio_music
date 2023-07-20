module.exports = (sequelize, DataType)=>{
    const alias = 'Delivery';

    const cols = {
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        type:{
            type:DataType.STRING(25),
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
        tableName:'deliveries',
        timastamps:true
    }

    const Delivery = sequelize.define(alias, cols, config);

    Delivery.associate= models =>{
        Delivery.belongsTo(models.Order,{
            as:'orders',
            foreignKey:'delivery_id'
        })
    }

    return Delivery;
}