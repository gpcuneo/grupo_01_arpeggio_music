module.exports = (sequelize, DataType) => {
    
    const alias = "Rol";

    const cols = {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rol: {
            type: DataType.STRING(25),
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
        tableName: 'roles',
        timestamps: true,
    }

    let Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) => {
        Rol.hasMany(models.User, {foreignKey: 'id_rol'});
    }

    return Rol
}
