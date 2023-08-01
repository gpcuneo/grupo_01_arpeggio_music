module.exports = (sequelize, DataType) => {
    
    const alias = "Category";

    const cols = {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataType.STRING(40),
            allowNull: false,
        },
        img: {
            type: DataType.STRING(100),
            allowNull: false,
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
        },
    }

    const config = {
        tableName: 'categories',
        timestamps: true,
    }

    let Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) => {
        Rol.hasMany(models.Product, {as: 'Products', foreignKey: 'category_id'});
    }

    return Rol
}
