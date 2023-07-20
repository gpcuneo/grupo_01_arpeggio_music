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
        sub_total:{
            type:DataType.FLOAT,
            allowNull:false
        },
        taxes:{
            type:DataType.FLOAT,
            allowNull:false
        },
        total:{
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
        tableName:'invoices',
        timestamps:true,
    }

    const Invoice = sequelize.define(alias, cols, config);

    Invoice.associate= models=>{
        Invoice.belongTo(models.Order, {
            as:'orders',
            foreignKey:'order_id'
        })
    }

    return Invoice;
}
