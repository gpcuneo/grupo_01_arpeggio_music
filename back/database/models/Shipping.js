module.exports=(sequelize, DataType)=>{
    const alias = 'Shipping';

    const cols= {
        id:{
            type: DataType.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        status:{
            type:DataType.STRING(200),
            allowNull:false
        },
        order_id:{
            type:DataType.INTEGER,
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
        tableName:'shippings',
        timestamps:true
    }

    const Shipping = sequelize.define(alias, cols, config);

    Shipping.associate=models =>{
        Shipping.belongsTo(models.Order,{
            as:'orders',
            foreignKey:'order_id'        
        })
    }

    return Shipping;
}