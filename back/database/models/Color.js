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

    Color.associate=(models)=>{
        Color.belongsToMany(models.Product,{
            as:'products',
            through:'product-color',
            foreignKey:'color_id',
            otherKey:'product_id',
            timestamps:true
        })
    }

    return Color;
}