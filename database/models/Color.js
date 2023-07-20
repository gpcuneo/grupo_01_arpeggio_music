module.exports=(sequelize, DataType) =>{

    const alias = 'Color';

    const cols={
        id:{
            type:DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        name:{
            type:DataType.STRING(40),
            allowNull:false
        },
        createdAt:{
            type:DataType.DATE,
            allowNull:false,
        },
        updatedAt:{
            type:DataType.DATE,
            allowNull:false
        }
    }

    const config = {
        tableName:'colors',
        timestamps:true
    }

    let Color = sequelize.define(alias, cols, config);

    return Color;
}