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
  },
  scoreType: {
    type: DataTypes.ENUM('progress', 'midterm', 'final'),
    allowNull: false,
    validate: {
      isIn: [['progress', 'midterm', 'final']],
    }
  },
}, {
  timestamps: false
});

module.exports = Score;