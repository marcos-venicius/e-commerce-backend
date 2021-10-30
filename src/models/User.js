const { v4 } = require('uuid');
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database');

class User extends Model {}

User.init(
  {
    id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.UUIDV4,
      defaultValue: v4(),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 8,
          msg: 'Your password must have more than 8 chars',
        },
        notEmpty: {
          msg: 'Your password cannot be empty',
        },
        notNull: {
          msg: 'Your password cannot be null',
        },
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
  },
);

User.sync();

module.exports = { User };
