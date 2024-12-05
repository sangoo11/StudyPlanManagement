const sequelize = require('./configs/sequelize');
const User = require('./models/user.model');
const Subject = require('./models/subject.model');
const LearningOutcome = require('./models/learningOutcome.model');
const Course = require('./models/course.model');
const SubjectScore = require('./models/subjectScore.model');
const LearningOutcomeScore = require('./models/learningOutcomeScore');

async function seedData() {
  try {
    await sequelize.sync({ alter: true }); // Clear existing data

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Enable foreign key checks again after truncating
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // // Create Roles
    // const roles = await Role.bulkCreate([
    //   { name: 'admin', description: 'System Administrator' },
    //   { name: 'teacher', description: 'Course Teacher' },
    //   { name: 'student', description: 'Student User' }
    // ]);

    // // Create Major
    // const major = await Major.create({
    //   major_name: 'Computer Science',
    //   major_description: 'Bachelor of Computer Science',
    //   min_credit: 130
    // });

    // Create Users
    const admin = await User.create({
      email: 'admin@example.com',
      password: 'admin123',
      fullName: 'System Admin',
      role: 'admin',
      isActive: true
    });

    const teachers = await User.bulkCreate([
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

    const students = await User.bulkCreate([
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
    const subjects = await Subject.bulkCreate([
      {
        code: 'CS101',
        name: 'Introduction to Programming',
        type: 'major',
        multiplicationFactor: 1,
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
    const learningOutcomes = await LearningOutcome.bulkCreate([
      {
        code: 1,
        name: 'Problem Solving',
        description: 'Ability to solve complex programming problems'
      },
      {
        code: 2,
        name: 'Code Organization',
        description: 'Ability to write clean and organized code'
      }
    ]);

    // Create Courses
    const courses = await Course.bulkCreate([
      {
        name: 'Programming Fundamentals A',
        semester: '1',
        year: '2023-2024',
        teacherId: teachers[0].id,
        subjectId: subjects[0].id,
        active: true
      },
      {
        name: 'Data Structures A',
        semester: '2',
        year: '2023-2024',
        teacherId: teachers[1].id,
        subjectId: subjects[1].id,
        active: true
      }
    ]);

    // Enroll students in courses
    await courses[0].addUsers([students[0], students[1]]);
    await courses[1].addUsers([students[1], students[2]]);

    // Create Subject Scores
    await SubjectScore.bulkCreate([
      {
        studentId: students[0].id,
        courseId: courses[0].id,
        firstComponentScore: 8.5,
        secondComponentScore: 7.5,
        finalComponentScore: 8.0,
        semester: '1',
        academicYear: '2023-2024',
        status: 'final',
        lastModifiedBy: teachers[0].id
      },
      {
        studentId: students[1].id,
        courseId: courses[0].id,
        firstComponentScore: 9.0,
        secondComponentScore: 8.5,
        finalComponentScore: 9.0,
        semester: '1',
        academicYear: '2023-2024',
        status: 'final',
        lastModifiedBy: teachers[0].id
      }
    ]);

    // Create Learning Outcome Scores
    await LearningOutcomeScore.bulkCreate([
      {
        learningOutcomeId: learningOutcomes[0].id,
        contributionPercentage: 60
      },
      {
        learningOutcomeId: learningOutcomes[1].id,
        contributionPercentage: 40
      }
    ]);

    // Associate Subjects with Learning Outcomes
    await subjects[0].addLearningOutcomes([learningOutcomes[0], learningOutcomes[1]]);
    await subjects[1].addLearningOutcomes([learningOutcomes[0]]);

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Export the seed function
module.exports = seedData;

// If running this file directly
if (require.main === module) {
  seedData()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}