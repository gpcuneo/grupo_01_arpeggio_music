module.exports = (sequelize, DataType) => {
    
    const alias = "User";
    
    const cols = {
        id: {
            type: DataType.CHAR(36),
            primaryKey: true,
            allowNull: false,
        },
        userName: {
            type: DataType.STRING(36),
            allowNull: false,
        },
        firstName: {
            type: DataType.STRING(24),
            allowNull: false,
        },
        lastName: {
            type: DataType.STRING(24),
            allowNull: false,
        },
        email: {
            type: DataType.TEXT,
            allowNull: false,
        },
        address: {
            type: DataType.TEXT,
            allowNull: false,
        },
        id_town: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        id_rol: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        dni: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        phone: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        password: {
            type: DataType.CHAR(60),
            allowNull: false,
        },
        active: {
            type: DataType.BOOLEAN,
            allowNull: false,
        },
        lastIP: {
            type: DataType.TEXT,
            allowNull: false,
        },
        image: {
            type: DataType.TEXT,
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
        tableName: 'users',
        timestamps: true,
    }

    return sequelize.define(alias, cols, config);
}