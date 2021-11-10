const { v4 } = require('uuid');
const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../database');

class Cart extends Model {}

Cart.init(
  {
    id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.UUIDV4,
      defaultValue: v4(),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        key: 'id',
        model: 'users',
      },
    },
    product_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        key: 'id',
        model: 'products',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'cart',
    sequelize,
  },
);

Cart.sync();

module.exports = { Cart };
