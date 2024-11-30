const { DataTypes } = require('sequelize');
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
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 1
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
  timestamps: true
});

module.exports = Subject;