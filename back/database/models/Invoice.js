module.exports=(sequelize, DataType) =>{
    const alias = 'Invoice';

    const cols = {
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement:true
        },
        order_id:{
            type:DataType.INTEGER,
            allowNull:false
        },
        total:{
            type:DataType.FLOAT,
            allowNull:false
        },
        payment_type:{
            type:DataType.STRING,
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
        tableName:'invoices',
        timestamps:true,
    }

    const Invoice = sequelize.define(alias, cols, config);

    Invoice.associate= models=>{
        Invoice.belongsTo(models.Order, {
            as:'orders',
            foreignKey:'order_id'
        })
    }

    return Invoice;
}
