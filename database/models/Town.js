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

    return sequelize.define(alias, cols, config);
}