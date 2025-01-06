const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../configs/sequelize');

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subjectCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Z]{2,4}\d{3}$/, // Regular expression for the subject code format
        msg: 'Invalid subject code format.'
      }
    }
  },
  subjectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('major', 'core'),
    allowNull: false
  },
  credit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 15
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: false
});

module.exports = Subject;
