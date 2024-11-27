const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const SubjectScore = sequelize.define('SubjectScore', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Subjects',
      key: 'id'
    }
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
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['studentId', 'subjectId', 'semester']
    }
  ]
});

// Virtual field for total score calculation
SubjectScore.prototype.getTotalScore = function() {
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

module.exports = SubjectScore;