const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const env = require('../config/env');

class User extends Model {
  async isPasswordValid(plainPassword) {
    return bcrypt.compare(plainPassword, this.pass);
  }

  toSafeJSON() {
    const values = { ...this.get() };
    delete values.pass;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 150]
      }
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      },
      set(value) {
        this.setDataValue('email', String(value || '').trim().toLowerCase());
      }
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 255]
      }
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [['user', 'coach', 'admin']]
      }
    },
    refresh_pass: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    otros: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    defaultScope: {
      attributes: { exclude: ['pass'] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['pass'] }
      }
    },
    hooks: {
      async beforeCreate(user) {
        user.pass = await bcrypt.hash(user.pass, env.bcryptSaltRounds);
      },
      async beforeUpdate(user) {
        if (user.changed('pass')) {
          user.pass = await bcrypt.hash(user.pass, env.bcryptSaltRounds);
        }
      }
    }
  }
);

module.exports = User;
