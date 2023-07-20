module.exports= (sequelize, DataType) =>{

    const alias = 'ProductColor';

    const cols ={
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        product_id:{ 
            type: DataType.INTEGER,
            allowNull:false,
            references:{
                model:'products',
                key:'id'
            }
        },
        color_id:{
            type:DataType.INTEGER,
            allowNull:false,
            references:{
                model:'colors',
                key:'id'
            }
        },
        quantity:{
            type:DataType.INTEGER,
            allowNull:false,
            default:0
        }
    }

    const config = {
        tableName:'product-color',
        timestamps:true
    }

    let ProductColor = sequelize.define(alias,cols,config);

    return ProductColor;
}