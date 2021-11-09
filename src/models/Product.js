const { v4 } = require('uuid');
const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../database');

class Product extends Model {}

Product.init(
  {
    id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.UUIDV4,
      defaultValue: v4(),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'products',
    sequelize,
  },
);

Product.associations = models => {
  Product.belongsTo(models.User, {
    as: 'user',
  });
  Product.hasMany(models.User, {
    foreignKey: 'product_id',
    as: 'likes_list',
    onDelete: 'CASCADE',
  });
  Product.hasMany(models.Dislikes, {
    foreignKey: 'product_id',
    as: 'dislikes_list',
    onDelete: 'CASCADE',
  });
};

Product.sync();

module.exports = { Product };
