const sequelize = require('../configs/sequelize');
const User = require('./user.model');
const Subject = require('./subject.model');
const LearningOutcome = require('./learningOutcome.model');
const Course = require('./course.model');
const SubjectScore = require('./subjectScore.model');
const LearningOutcomeScore = require('./learningOutcomeScore');

// Student - Course relationships (using scoped User model)
User.belongsToMany(Course, {
  through: 'StudentClasses',
  foreignKey: 'userId',
  otherKey: 'courseId',
  as: 'enrolledClasses',
  scope: {
    role: 'student'
  }
});

Course.belongsToMany(User, {
  through: 'StudentClasses',
  foreignKey: 'courseId',
  otherKey: 'userId',
  as: 'students',
  scope: {
    role: 'student'
  }
});

// Teacher - Course relationships (using scoped User model)
Course.belongsTo(User, {
  foreignKey: 'teacherId',
  as: 'teacher',
  scope: {
    role: 'teacher'
  }
});

User.hasMany(Course, {
  foreignKey: 'teacherId',
  scope: {
    role: 'teacher'
  }
});

// Subject - LearningOutcome relationships
Subject.belongsToMany(LearningOutcome, {
  through: 'SubjectLearningOutcomes',
  foreignKey: 'subjectId',
});
LearningOutcome.belongsToMany(Subject, {
  through: 'SubjectLearningOutcomes',
  foreignKey: 'learningOutcomeId',
});

// Subject - Course relationships
Subject.hasMany(Course, {
  foreignKey: 'subjectId'
});
Course.belongsTo(Subject, {
  foreignKey: 'subjectId',
});

// SubjectScore relationships (using scoped User model)
User.hasMany(SubjectScore, {
  foreignKey: 'studentId',
  scope: {
    role: 'student'
  }
});
SubjectScore.belongsTo(User, {
  foreignKey: 'studentId',
  as: 'student',
  scope: {
    role: 'student'
  }
});

SubjectScore.belongsTo(User, {
  foreignKey: 'lastModifiedBy',
  as: 'modifiedByTeacher',
  scope: {
    role: 'teacher'
  }
});

Course.hasMany(SubjectScore, {
  foreignKey: 'courseId'
});
SubjectScore.belongsTo(Course, {
  foreignKey: 'courseId'
});

// LearningOutcome - LearningOutcomeScore relationships
LearningOutcome.hasMany(LearningOutcomeScore, {
  foreignKey: 'learningOutcomeId'
});
LearningOutcomeScore.belongsTo(LearningOutcome, {
  foreignKey: 'learningOutcomeId'
});

// Sync all models with database
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });

// Export all models
module.exports = {
  sequelize,
  User,
  Subject,
  LearningOutcome,
  Course,
  SubjectScore,
  LearningOutcomeScore,
};