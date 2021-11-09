const { v4 } = require('uuid');
const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../database');

class Likes extends Model {}

Likes.init(
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
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'likes',
    sequelize,
  },
);

Likes.sync();

module.exports = { Likes };
