const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../configs/sequelize');

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('major', 'industry'),
    allowNull: false
  },
  multiplicationFactor: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 1
    }
  },
  credit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 20
    }
  },
  description: {
    type: DataTypes.STRING
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
});

module.exports = Subject;