const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');
const Subject = require('./subject.model');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // Regular expression to match the subject code format (e.g., SE113.P11)
      is: {
        args: /^[A-Z]{2,4}\d{3}\.[A-Z]\d{2}$/,
        msg: 'Invalid course code format.'
      },
      // Custom validation to check if the subject code exists
      async isSubjectExist(value) {
        const subjectCode = value.split('.')[0];  // Extract the subject code before the period
        const subject = await Subject.findOne({ where: { subjectCode: subjectCode } });
        if (!subject) {
          throw new Error(`Subject with code ${subjectCode} does not exist.`);
        }
      }
    }
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 2
    }
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d{4}-\d{4}$/,
      isValidYearRange(value) {
        const [startYear, endYear] = value.split('-').map(Number);
        if (endYear !== startYear + 1) {
          throw new Error('Not correct year');
        }
      }
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  subjectID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  studentCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  teacherID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  timestamps: false
});

module.exports = Course;