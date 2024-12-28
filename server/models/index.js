const sequelize = require('../configs/sequelize');
const User = require('./user.model');
const Subject = require('./subject.model');
const LearningOutcome = require('./learningOutcome.model');
const Course = require('./course.model');
const Score = require('./score.model');
const LearningOutcomeScore = require('./learningOutcomeScore.model');
const Enrollment = require('./enrollment.model')

// Student - Course relationships (using scoped User model)
//Student - Enrollment - Course
User.belongsToMany(Course, {
  through: 'Enrollment',
  foreignKey: 'studentId',
});

Course.belongsToMany(User, {
  through: 'Enrollment',
  foreignKey: 'courseId',
});

Enrollment.belongsTo(User, {
  foreignKey: 'studentId'
});
Enrollment.belongsTo(Course, {
  foreignKey: 'courseId'
});

// Teacher - Course 
Course.belongsTo(User, {
  foreignKey: 'teacherId',
});
User.hasMany(Course, {
  foreignKey: 'teacherId',
});

// Subject - LearningOutcome relationships
Subject.belongsToMany(LearningOutcome, {
  through: 'SubjectLearningOutcome',
  foreignKey: 'subjectId',
});
LearningOutcome.belongsToMany(Subject, {
  through: 'SubjectLearningOutcome',
  foreignKey: 'learningOutcomeId',
});

//LearningOutcome - LearningOutcomeScore relationships
LearningOutcome.hasOne(LearningOutcomeScore, {
  foreignKey: 'learningOutcomeId',
});
LearningOutcomeScore.belongsTo(LearningOutcome, {
  foreignKey: 'learningOutcomeId',
});

//LearningOutcomeScore - User(Student) relationships
User.hasMany(LearningOutcomeScore, {
  foreignKey: 'studentId',
});
LearningOutcomeScore.belongsTo(User, { foreignKey: 'studentId' });

// Subject - Course relationships
Subject.hasMany(Course, {
  foreignKey: 'subjectId'
});
Course.belongsTo(Subject, {
  foreignKey: 'subjectId',
});

// Score - User(Teacher)
User.hasMany(Score, {
  foreignKey: 'teacherId',
});
Score.belongsTo(User, {
  foreignKey: 'teacherId',
  as: 'gradedBy',
});

// Score - Enrollemnt
Enrollment.hasMany(Score, {
  foreignKey: 'enrollmentId',
});
Score.belongsTo(Enrollment, { foreignKey: 'enrollmentId' });

// Sync all models with database
sequelize
  .sync({ sync: true }).then(() => {
    console.log("Database & tables created!");

    try {
      // Create Users
      User.create({
        email: 'admin@example.com',
        password: 'admin123',
        fullName: 'System Admin',
        role: 'admin',
        status: 'active',
      });

      User.bulkCreate([
        {
          email: 'teacher1@example.com',
          password: 'teacher123',
          fullName: 'John Smith',
          role: 'teacher',
          major: 'Data Science',
          status: 'active',
        },
        {
          email: 'teacher2@example.com',
          password: 'teacher123',
          fullName: 'Jane Doe',
          role: 'teacher',
          major: 'Software Engineering',
          status: 'active',
        }
      ]);

      User.bulkCreate([
        {
          email: 'student1@example.com',
          password: 'student123',
          fullName: 'Alice Johnson',
          role: 'student',
          major: 'Computer Science',
          isActive: true
        },
        {
          email: 'student2@example.com',
          password: 'student123',
          fullName: 'Bob Wilson',
          role: 'student',
          major: 'Software Engineering',
          isActive: true
        },
        {
          email: 'student3@example.com',
          password: 'student123',
          fullName: 'Charlie Brown',
          role: 'student',
          major: 'Data Science',
          isActive: true
        }
      ]);

      // Create Subjects
      Subject.bulkCreate([
        {
          subjectCode: 'IT001',
          name: 'Introduction to Programming',
          type: 'core',
          credit: 2,
          description: 'Basic programming concepts',
          active: true
        },
        {
          subjectCode: 'SE332',
          name: 'Advanced Database',
          type: 'major',
          credit: 4,
          description: 'Advanced database concepts',
          active: true
        }
      ]);

      // Create Courses
      Course.bulkCreate([
        {
          courseCode: 'IT001.P11',
          semester: 1,
          year: '2023-2024',
          active: true
        },
        {
          courseCode: 'IT001.P12',
          semester: 2,
          year: '2022-2023',
          active: true
        },
        {
          courseCode: 'SE332.021',
          semester: 1,
          year: '2023-2024',
          active: true
        },
        {
          courseCode: 'SE332.021',
          semester: 2,
          year: '2022-2023',
          active: true
        }
      ]);

      // Create Learning Outcomes
      LearningOutcome.bulkCreate([
        {
          learningOutcomeCode: "LO1",
          name: "Problem Solving",
          description: "Ability to solve complex programming problems",
          active: true
        },
        {
          learningOutcomeCode: "LO2",
          name: "Foundational Knowledge",
          description: "Mastering foundational and some specialized knowledge.",
          active: true
        },
        {
          learningOutcomeCode: "LO3",
          name: "Critical Thinking and Creative Solutions",
          description: "Surveying documents, reasoning, analyzing, and proposing creative solutions to problems, awareness of the need for lifelong learning.",
          active: true
        },
        {
          learningOutcomeCode: "LO4",
          name: "Design and Implementation",
          description: "Designing, implementing, and evaluating systems and solutions..",
          active: true
        },
        {
          learningOutcomeCode: "LO5",
          name: "Communication and Collaboration",
          description: "Communicating, collaborating, and connecting effectively with individuals and teams in specific professional contexts.",
          active: true
        },
        {
          learningOutcomeCode: "LO6",
          name: "Professional Communication in Foreign Languages",
          description: "Communicating in professional settings, reading and understanding documents, and presenting industry solutions in foreign languages.",
          active: true
        },
        {
          learningOutcomeCode: "LO7",
          name: "Leadership and Management",
          description: "Understanding leadership and management.",
          active: true
        },
        {
          learningOutcomeCode: "LO8",
          name: "Professional Responsibility and Ethics",
          description: "Understanding professional responsibility, respecting the law, and ethical values.",
          active: true
        }
      ]);

      console.log(("Create data success"));
    } catch (err) {
      console.log("Create data failed", err);
    }
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });

// // Export all models
// module.exports = {
//   sequelize,
//   User,
//   Subject,
//   LearningOutcome,
//   Course,
//   Score,
//   Enrollment,
// };