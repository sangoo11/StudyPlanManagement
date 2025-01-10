const sequelize = require('../configs/sequelize');
const Account = require('./account.model');
const Student = require('./student.model');
const Teacher = require('./teacher.model');
const Admin = require('./admin.model');
const Subject = require('./subject.model');
const LearningOutcome = require('./learningOutcome.model');
const Course = require('./course.model');
const Score = require('./score.model');
const LearningOutcomeScore = require('./learningOutcomeScore.model');
const Enrollment = require('./enrollment.model');
const Modification = require('./modification.model');

// User - Account relationships
Account.belongsTo(Student, {
  foreignKey: "accountID",
  constraints: false,
  as: "Student",
});

Account.belongsTo(Teacher, {
  foreignKey: "accountID",
  constraints: false,
  as: "Teacher",
});

Account.belongsTo(Admin, {
  foreignKey: "accountID",
  constraints: false,
  as: "Admin",
});

// Student - Course - Enrollment relationships
Student.belongsToMany(Course, {
  through: 'Enrollment',
  foreignKey: 'studentID',
});
Course.belongsToMany(Student, {
  through: 'Enrollment',
  foreignKey: 'courseID',
});
Enrollment.belongsTo(Student, {
  foreignKey: 'studentID'
});
Enrollment.belongsTo(Course, {
  foreignKey: 'courseID'
});

// Teacher - Course 
Course.belongsTo(Teacher, {
  foreignKey: 'teacherID',
});
Teacher.hasMany(Course, {
  foreignKey: 'teacherID',
});

// Subject - LearningOutcome relationships
Subject.belongsToMany(LearningOutcome, {
  through: 'SubjectLearningOutcome',
  foreignKey: 'subjectID',
});
LearningOutcome.belongsToMany(Subject, {
  through: 'SubjectLearningOutcome',
  foreignKey: 'learningOutcomeID',
});

//LearningOutcome - LearningOutcomeScore relationships
LearningOutcome.hasOne(LearningOutcomeScore, {
  foreignKey: 'learningOutcomeID',
});
LearningOutcomeScore.belongsTo(LearningOutcome, {
  foreignKey: 'learningOutcomeID',
});

//LearningOutcomeScore - Student relationships
Student.hasMany(LearningOutcomeScore, { foreignKey: 'studentID', });
LearningOutcomeScore.belongsTo(Student, { foreignKey: 'studentID' });

// Subject - Course relationships
Subject.hasMany(Course, {
  foreignKey: 'subjectID'
});
Course.belongsTo(Subject, {
  foreignKey: 'subjectID',
});

// Score - Teacher
Teacher.hasMany(Score, {
  foreignKey: 'teacherID',
});
Score.belongsTo(Teacher, {
  foreignKey: 'teacherID',
  as: 'gradedBy',
});

// Score - Enrollemnt
Enrollment.hasMany(Score, {
  foreignKey: 'enrollmentID',
});
Score.belongsTo(Enrollment, { foreignKey: 'enrollmentID' });

// Create data
const accounts = [
  // 3 teacher accounts
  { email: 'teacher1@example.com', password: 'password123', accountableType: 'teacher' },
  { email: 'teacher2@example.com', password: 'password123', accountableType: 'teacher' },
  { email: 'teacher3@example.com', password: 'password123', accountableType: 'teacher' },

  // 10 student accounts
  { email: 'student1@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student2@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student3@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student4@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student5@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student6@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student7@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student8@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student9@example.com', password: 'password123', accountableType: 'student' },
  { email: 'student10@example.com', password: 'password123', accountableType: 'student' },

  // 1 admin account
  { email: 'admin@example.com', password: 'password123', accountableType: 'admin' },
];

const admins = [
  { accountID: 1, status: 'Active' } // Single admin entry
];

const students = [
  { accountID: 4, fullName: 'John Doe', major: 'Computer Science', credit: 0, status: 'active' },
  { accountID: 5, fullName: 'Jane Smith', major: 'Mathematics', credit: 0, status: 'terminated' },
  { accountID: 6, fullName: 'Mark Johnson', major: 'Physics', credit: 0, status: 'suspended' },
  { accountID: 7, fullName: 'Lucy Brown', major: 'Engineering', credit: 0, status: 'active' },
  { accountID: 8, fullName: 'Michael Davis', major: 'Economics', credit: 0, status: 'onleave' },
  { accountID: 9, fullName: 'Emma Wilson', major: 'Psychology', credit: 0, status: 'active' },
  { accountID: 10, fullName: 'Oliver Moore', major: 'Biology', credit: 0, status: 'active' },
  { accountID: 11, fullName: 'Sophia Taylor', major: 'Chemistry', credit: 0, status: 'suspended' },
  { accountID: 12, fullName: 'Liam Anderson', major: 'History', credit: 0, status: 'active' },
  { accountID: 13, fullName: 'Isabella Thomas', major: 'Literature', credit: 0, status: 'terminated' },
];

const teachers = [
  { accountID: 14, fullName: 'Dr. Alan Green', major: 'Mathematics', status: 'Active' },
  { accountID: 15, fullName: 'Prof. Sarah White', major: 'Computer Science', status: 'On leave' },
  { accountID: 16, fullName: 'Dr. Henry Black', major: 'Physics', status: 'Suspended' },
];

const subjects = [
  { subjectCode: 'SE113', subjectName: 'Introduction to Software Engineering', type: 'core', credit: 3, description: 'Learn the basics of software engineering practices.' },
  { subjectCode: 'SE214', subjectName: 'Data Structures and Algorithms', type: 'core', credit: 4, description: 'In-depth understanding of algorithms and data structures.' },
  { subjectCode: 'SE300', subjectName: 'Software Design Patterns', type: 'major', credit: 3, description: 'Study of common design patterns in software development.' },
  { subjectCode: 'SE400', subjectName: 'Advanced Programming', type: 'core', credit: 5, description: 'Advanced topics in programming and software architecture.' },
  { subjectCode: 'CS101', subjectName: 'Introduction to Computer Science', type: 'core', credit: 3, description: 'Basic introduction to the field of computer science.' },
  { subjectCode: 'CS205', subjectName: 'Database Systems', type: 'major', credit: 4, description: 'Understanding the fundamentals of database management systems.' },
  { subjectCode: 'CS303', subjectName: 'Computer Networks', type: 'major', credit: 3, description: 'Study of computer networking principles and protocols.' },
  { subjectCode: 'MATH101', subjectName: 'Discrete Mathematics', type: 'core', credit: 3, description: 'Foundational knowledge of mathematics for computer science.' },
  { subjectCode: 'MATH204', subjectName: 'Linear Algebra', type: 'major', credit: 4, description: 'Study of linear equations and matrices in mathematical contexts.' },
  { subjectCode: 'CS501', subjectName: 'Machine Learning', type: 'major', credit: 4, description: 'Introduction to machine learning concepts and techniques.' }
];

const courses = [
  { courseCode: 'SE113.P01', semester: 1, year: '2024-2025', subjectID: 1, teacherID: null }, // No teacher assigned
  { courseCode: 'SE113.P02', semester: 1, year: '2024-2025', subjectID: 1, teacherID: null },

  { courseCode: 'SE214.P01', semester: 1, year: '2024-2025', subjectID: 2, teacherID: null }, // No teacher assigned
  { courseCode: 'SE214.P02', semester: 1, year: '2024-2025', subjectID: 2, teacherID: null },

  { courseCode: 'SE300.P01', semester: 2, year: '2024-2025', subjectID: 3, teacherID: null }, // No teacher assigned

  { courseCode: 'SE400.P01', semester: 2, year: '2024-2025', subjectID: 4, teacherID: null },

  { courseCode: 'CS101.P01', semester: 1, year: '2024-2025', subjectID: 5, teacherID: null },

  { courseCode: 'CS205.P01', semester: 1, year: '2024-2025', subjectID: 6, teacherID: null },

  { courseCode: 'CS303.P01', semester: 2, year: '2024-2025', subjectID: 7, teacherID: null },

  { courseCode: 'MATH101.P01', semester: 1, year: '2024-2025', subjectID: 8, teacherID: null },

  { courseCode: 'MATH204.P01', semester: 2, year: '2024-2025', subjectID: 9, teacherID: null },

  { courseCode: 'CS501.P01', semester: 1, year: '2024-2025', subjectID: 10, teacherID: null }
];

const learningOutcomes = [
  {
    learningOutcomeCode: 'LO1',
    learningOutcomeName: 'Master the fundamental knowledge of natural sciences, social sciences, and understand how to apply that knowledge to the field of Software Engineering and practice.',
    description: 'ABET 3.1',
    active: true
  },
  {
    learningOutcomeCode: 'LO2',
    learningOutcomeName: 'Master the foundational knowledge and some specialized knowledge of Software Engineering to apply it to practice.',
    description: 'ABET 3.2, GAC2.b',
    active: true
  },
  {
    learningOutcomeCode: 'LO3',
    learningOutcomeName: 'Survey literature, reason, analyze, and propose creative solutions to problems related to Software Engineering; awareness of the need for lifelong learning.',
    description: 'ABET 3.6, ABET 3.7, GAC2.a',
    active: true
  },
  {
    learningOutcomeCode: 'LO4',
    learningOutcomeName: 'Design, implement, and evaluate systems and solutions in Software Engineering.',
    description: 'ABET 3.2, ABET 3.6, GAC2.a',
    active: true
  },
  {
    learningOutcomeCode: 'LO5',
    learningOutcomeName: 'Communicate, collaborate, and connect effectively with individuals and groups in specific professional contexts.',
    description: 'ABET 3.5, GAC2.c',
    active: true
  },
  {
    learningOutcomeCode: 'LO6',
    learningOutcomeName: 'Communicate professionally, understand documents, and present technical solutions in a foreign language.',
    description: '',
    active: true
  },
  {
    learningOutcomeCode: 'LO7',
    learningOutcomeName: 'Understand leadership and management.',
    description: 'GAC2.d',
    active: true
  },
  {
    learningOutcomeCode: 'LO8',
    learningOutcomeName: 'Understand professional responsibility, respect for law, and ethical values.',
    description: 'ABET 3.4',
    active: true
  }
];

const modifications = [
  {
    key: 'progress',
    value: '0.2'
  },
  {
    key: 'midterm',
    value: '0.3'
  },
  {
    key: 'final',
    value: '0.5'
  },
  {
    key: 'core',
    value: '0.5'
  },
  {
    key: 'major',
    value: '1'
  }
];


const createData = async () => {
  await Account.bulkCreate(accounts);
  await Student.bulkCreate(students);
  await Teacher.bulkCreate(teachers);
  await Admin.bulkCreate(admins);

  // Create Subjects
  await Subject.bulkCreate(subjects);

  // Create Courses
  await Course.bulkCreate(courses);

  // Create Learning Outcomes
  await LearningOutcome.bulkCreate(learningOutcomes);
  await Modification.bulkCreate(modifications);
}

const checkAndCreateData = async () => {
  const accountCount = await Account.count();
  if (accountCount === 0) {
    await createData();
    console.log("Data created!");
  } else {
    console.log("Database already contains data, skipping creation");
  }
};

// Sync all models with database
sequelize
  .sync()
  .then(async () => {
    console.log("Database & tables created!");
    await checkAndCreateData();
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });
