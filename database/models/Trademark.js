module.exports= (sequelize, DataType)=>{
    const alias = 'Trademark';
    const cols = {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataType.STRING(50),
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
    const config ={
        tableName:'trademarks',
        timestamps:true
    }
    const Trademark = sequelize.define(alias,cols, config);
    
    Trademark.associate = models =>{
        Trademark.hasMany(models.Product,{
            as:'product',
            foreignKey:'trademark_id'
        })
    }

    return Trademark;
}