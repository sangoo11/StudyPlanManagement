const sequelize = require('../configs/sequelize');
const User = require('./user.model');
const Subject = require('./subject.model');
const LearningOutcome = require('./learningOutcome.model');
const Course = require('./course.model');
const Score = require('./score.model');
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

// Subject - Course relationships
Subject.hasMany(Course, {
  foreignKey: 'subjectId'
});
Course.belongsTo(Subject, {
  foreignKey: 'subjectId',
});

// Score - User(Student)
User.hasMany(Score, {
  foreignKey: 'studentId',
});
Score.belongsTo(User, {
  foreignKey: 'studentId',
  as: 'student',
});

// Score - User(Teacher)
User.hasMany(Score, {
  foreignKey: 'teacherId',
});

//LearningOutcomeScore - Subject

Score.belongsTo(Course, { foreignKey: 'courseId' });
Score.belongsTo(Course, { foreignKey: 'courseId' });


// LearningOutcome - LearningOutcomeScore relationships
// Score.belongsTo(User, { foreignKey: 'studentId' });
// Score.belongsTo(LearningOutcome, { foreignKey: 'learningOutcomeId' });


// LearningOutcome.hasMany(Score, {
//   foreignKey: 'learningOutcomeId'
// });
// Score.belongsTo(LearningOutcome, {
//   foreignKey: 'learningOutcomeId'
// });



// Sync all models with database
sequelize
  .sync({ alter: true }).then(() => {
    console.log("Database & tables created!");

    try {
      // Create Users
      User.create({
        email: 'admin@example.com',
        password: 'admin123',
        fullName: 'System Admin',
        role: 'admin',
        isActive: true
      });

      User.bulkCreate([
        {
          email: 'teacher1@example.com',
          password: 'teacher123',
          fullName: 'John Smith',
          role: 'teacher',
          isActive: true
        },
        {
          email: 'teacher2@example.com',
          password: 'teacher123',
          fullName: 'Jane Doe',
          role: 'teacher',
          isActive: true
        }
      ]);

      User.bulkCreate([
        {
          email: 'student1@example.com',
          password: 'student123',
          fullName: 'Alice Johnson',
          role: 'student',
          isActive: true
        },
        {
          email: 'student2@example.com',
          password: 'student123',
          fullName: 'Bob Wilson',
          role: 'student',
          isActive: true
        },
        {
          email: 'student3@example.com',
          password: 'student123',
          fullName: 'Charlie Brown',
          role: 'student',
          isActive: true
        }
      ]);

      // Create Subjects
      Subject.bulkCreate([
        {
          code: 'CS101',
          name: 'Introduction to Programming',
          type: 'major',
          multiplicationFactor: 0.5,
          description: 'Basic programming concepts'
        },
        {
          code: 'CS102',
          name: 'Data Structures',
          type: 'major',
          multiplicationFactor: 1,
          description: 'Fundamental data structures'
        }
      ]);

      // Create Learning Outcomes
      LearningOutcome.bulkCreate([
        {
          "code": "LO1",
          "name": "Problem Solving",
          "description": "Ability to solve complex programming problems"
        },
        {
          "code": "LO2",
          "name": "Foundational Knowledge",
          "description": "Mastering foundational and some specialized knowledge."
        },
        {
          "code": "LO3",
          "name": "Critical Thinking and Creative Solutions",
          "description": "Surveying documents, reasoning, analyzing, and proposing creative solutions to problems, awareness of the need for lifelong learning."
        },
        {
          "code": "LO4",
          "name": "Design and Implementation",
          "description": "Designing, implementing, and evaluating systems and solutions.."
        },
        {
          "code": "LO5",
          "name": "Communication and Collaboration",
          "description": "Communicating, collaborating, and connecting effectively with individuals and teams in specific professional contexts."
        },
        {
          "code": "LO6",
          "name": "Professional Communication in Foreign Languages",
          "description": "Communicating in professional settings, reading and understanding documents, and presenting industry solutions in foreign languages."
        },
        {
          "code": "LO7",
          "name": "Leadership and Management",
          "description": "Understanding leadership and management."
        },
        {
          "code": "LO8",
          "name": "Professional Responsibility and Ethics",
          "description": "Understanding professional responsibility, respecting the law, and ethical values."
        }
      ]);

      // Create Courses
      Course.bulkCreate([
        {
          name: 'CS101.P11',
          semester: '1',
          year: '2023-2024',
          active: true
        },
        {
          name: 'CS101.P12',
          semester: '2',
          year: '2023-2024',
          active: true
        },
        {
          name: 'CS102.A15',
          semester: '2',
          year: '2023-2024',
          active: true
        }
      ]);

      // Create LearningOutcomeScore

      //Create Enrollment (Student)

      console.log(("Create data success"));
    } catch (err) {
      console.log("Create data failed", err);
    }
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
  Score,
  Enrollment,
};