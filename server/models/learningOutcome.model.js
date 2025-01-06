const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const LearningOutcome = sequelize.define('LearningOutcome', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  learningOutcomeCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^LO\d{1,2}$/,
        msg: 'Invalid learning outcome code format.'
      }
    }
  },
  learningOutcomeName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: false
});

module.exports = LearningOutcome; 