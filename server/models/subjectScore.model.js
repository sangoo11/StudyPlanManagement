const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const SubjectScore = sequelize.define('SubjectScore', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstComponentScore: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 10
    },
    comment: '20% component'
  },
  secondComponentScore: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 10
    },
    comment: '30% component'
  },
  finalComponentScore: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 10
    },
    comment: '50% component'
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false
  },
  academicYear: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'final', 'archived'),
    defaultValue: 'draft'
  },
}, {
  timestamps: true,
});

// Virtual field for total score calculation
SubjectScore.prototype.getTotalScore = function () {
  if (this.firstComponentScore === null ||
    this.secondComponentScore === null ||
    this.finalComponentScore === null) {
    return null;
  }

  return (
    (this.firstComponentScore * 0.2) +
    (this.secondComponentScore * 0.3) +
    (this.finalComponentScore * 0.5)
  );
};

// Method to check if all components are graded
SubjectScore.prototype.isFullyGraded = function () {
  return (
    this.firstComponentScore !== null &&
    this.secondComponentScore !== null &&
    this.finalComponentScore !== null
  );
};

module.exports = SubjectScore;