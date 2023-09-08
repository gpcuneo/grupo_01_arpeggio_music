module.exports = (sequelize, DataType) => {
    const alias = 'Order';

    const cols = {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataType.CHAR(36),
            allowNull: false
        },
        delivery_id: {
            type: DataType.INTEGER,
            allowNull: false
        },
        preference_id: {
            type: DataType.CHAR(46),
            allowNull: false
        },
        status: {
            type: DataType.STRING(),
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
        }
    };

    const config = {
        tableName: 'orders',
        timestamps: true
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = models => {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        Order.belongsTo(models.Delivery, {
            as: 'delivery',
            foreignKey: 'delivery_id'
        })
    };

    Order.associate = (models) => {
        //Town.hasMany(models.User, {as: 'Users', foreignKey: 'id_town'});
        Order.hasMany(models.Invoice, {as: 'Invoice', foreignKey: 'order_id'});
        Order.hasMany(models.Shipping, {as: 'Shipping', foreignKey: 'order_id'});
    }

    return Order;
}