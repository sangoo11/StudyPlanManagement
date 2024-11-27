const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const SubjectLearningOutcome = sequelize.define('SubjectLearningOutcome', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Subjects',
      key: 'id'
    }
  },
  learningOutcomeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'LearningOutcomes',
      key: 'id'
    }
  },
  contributionPercentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['subjectId', 'learningOutcomeId']
    }
  ]
});

module.exports = SubjectLearningOutcome;