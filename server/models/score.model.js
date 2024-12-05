const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const Score = sequelize.define('score', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  score: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 10
    },
    defaultValue: 5
  }
}, {
  timestamps: false
});

module.exports = Score;