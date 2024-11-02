const sequelize = require("../configs/sequelize");
const Account = require("../models/account.model");
const Admin = require("../models/admin.model");
const Class = require("../models/class.model");
const Major = require("../models/major.model");
const Requirement = require("../models/requirement.model");
const Student = require("../models/student.model");
const Subject = require("../models/subject.model");
const Teacher = require("../models/teacher.model");

// Set up relationships


// Sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });