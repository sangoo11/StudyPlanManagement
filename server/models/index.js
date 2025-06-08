const sequelize = require("../configs/sequelize");
const { checkAndCreateData } = require("./data");

const Account = require("./account.model");
const Student = require("./student.model");
const Teacher = require("./teacher.model");
const Admin = require("./admin.model");
const Subject = require("./subject.model");
const LearningOutcome = require("./learningOutcome.model");
const Course = require("./course.model");
const Score = require("./score.model");
const LearningOutcomeScore = require("./learningOutcomeScore.model");
const Enrollment = require("./enrollment.model");
const Modification = require("./modification.model");
const Major = require("./major.model");
const SubjectLearningOutcome = require("./subjectLearningOutcome.model");
const AwardStudent = require("./awardStudent.model");
const Award = require("./award.model");
const KnowledgeDomain = require("./knowledgeDomain.model");
const KnowledgeField = require("./knowledgeField.model");
const Certificate = require("./certificate.model");
const VerificationLogs = require("./verificationLogs.model");
const LearningOutcomeLevel = require("./learningOutcomeLevel.model");

// User - Account relationships
Student.belongsTo(Account, {
  foreignKey: "accountID",
  constraints: false,
  as: "Student",
});

Teacher.belongsTo(Account, {
  foreignKey: "accountID",
  constraints: false,
  as: "Teacher",
});

Admin.belongsTo(Account, {
  foreignKey: "accountID",
  constraints: false,
  as: "Admin",
});

// Student/ Teacher - Major
Student.belongsTo(Major, {
  foreignKey: "majorID",
  constraints: false,
});

Teacher.belongsTo(Major, {
  foreignKey: "majorID",
  constraints: false,
});

// Student - Course - Enrollment relationships
Student.belongsToMany(Course, {
  through: "Enrollment",
  foreignKey: "studentID",
});
Course.belongsToMany(Student, {
  through: "Enrollment",
  foreignKey: "courseID",
});
Enrollment.belongsTo(Student, {
  foreignKey: "studentID",
});
Enrollment.belongsTo(Course, {
  foreignKey: "courseID",
});

// Teacher - Course
Course.belongsTo(Teacher, {
  foreignKey: "teacherID",
});
Teacher.hasMany(Course, {
  foreignKey: "teacherID",
});

// Subject - LearningOutcome relationships
Subject.belongsToMany(LearningOutcome, {
  through: "SubjectLearningOutcome",
  foreignKey: "subjectID",
});
LearningOutcome.belongsToMany(Subject, {
  through: "SubjectLearningOutcome",
  foreignKey: "learningOutcomeID",
});

//LearningOutcome - LearningOutcomeScore relationships
LearningOutcome.hasOne(LearningOutcomeScore, {
  foreignKey: "learningOutcomeID",
});
LearningOutcomeScore.belongsTo(LearningOutcome, {
  foreignKey: "learningOutcomeID",
});

//LearningOutcomeScore - Student relationships
Student.hasMany(LearningOutcomeScore, { foreignKey: "studentID" });
LearningOutcomeScore.belongsTo(Student, { foreignKey: "studentID" });

// Subject - Course relationships
Subject.hasMany(Course, {
  foreignKey: "subjectID",
});
Course.belongsTo(Subject, {
  foreignKey: "subjectID",
});

// Score - Teacher
Teacher.hasMany(Score, {
  foreignKey: "teacherID",
});
Score.belongsTo(Teacher, {
  foreignKey: "teacherID",
  as: "gradedBy",
});

// Score - Enrollemnt
Enrollment.hasMany(Score, {
  foreignKey: "enrollmentID",
});
Score.belongsTo(Enrollment, { foreignKey: "enrollmentID" });

// Subject - Major
Subject.belongsTo(Major, {
  foreignKey: "majorID",
});

Award.belongsToMany(Student, {
  through: "AwardStudent",
  foreignKey: "awardID",
});
Student.belongsToMany(Award, {
  through: "AwardStudent",
  foreignKey: "studentID",
});
AwardStudent.belongsTo(Award, {
  foreignKey: "awardID",
});
AwardStudent.belongsTo(Student, {
  foreignKey: "studentID",
});


// Subject - KnowledgeField
KnowledgeField.hasMany(Subject, {
  foreignKey: "knowledgeFieldID",
  as: "subjects", // Optional alias
});
Subject.belongsTo(KnowledgeField, {
  foreignKey: "knowledgeFieldID",
});

// KnowledgeField - KnowledgeDomain
KnowledgeDomain.hasMany(KnowledgeField, {
  foreignKey: "knowledgeDomainID",
  as: "fields",
});

KnowledgeField.belongsTo(KnowledgeDomain, {
  foreignKey: "knowledgeDomainID",
});

// 1 student can have many certificates
Student.hasMany(Certificate, { foreignKey: "studentID" });
Certificate.belongsTo(Student, { foreignKey: "studentID" });

// 1 certificate can have many verification logs
Certificate.hasMany(VerificationLogs, { foreignKey: "certificateID" });
VerificationLogs.belongsTo(Certificate, { foreignKey: "certificateID" });

// VerificationLogs - Account (verifiedBy is a userId, 1-1 relationship)
VerificationLogs.belongsTo(Account, { foreignKey: "verifiedBy", as: "verifier" });

// Learningoutcome - Learningoutcome level
LearningOutcome.hasMany(LearningOutcomeLevel, { foreignKey: "learningOutcomeID" })

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
