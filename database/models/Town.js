module.exports = (sequelize, DataType) => {
    
    const alias = "Town";

    const cols = {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_province: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        town: {
            type: DataType.STRING(255),
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
    
    const config = {
        tableName: 'towns',
        timestamps: true,
    }

    let Town = sequelize.define(alias, cols, config);

    Town.associate = (models) => {
        Town.hasMany(models.User, {as: 'Users', foreignKey: 'id_town'});
        Town.belongsTo(models.Province, {as: 'Province', foreignKey: 'id_province'});
    }
    
    return Town
}