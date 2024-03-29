module.exports = (sequelize, DataType) => {
    
    const alias = "Province";

    const cols = {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
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
        tableName: 'provinces',
        timestamps: true,
    }

    let Province = sequelize.define(alias, cols, config);

    Province.associate = (models) => {
        Province.hasMany(models.Town, {as: 'Towns', foreignKey: 'id_province'});
        Province.hasMany(models.User, {as: 'Users', foreignKey: 'id_province'});
    }

    return Province
}
