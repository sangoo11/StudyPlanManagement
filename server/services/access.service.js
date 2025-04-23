const Student = require("../models/student.model");
const Account = require("../models/account.model");
const Teacher = require("../models/teacher.model");
const Admin = require("../models/admin.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const LearningOutcome = require("../models/learningOutcome.model");
const LearningOutcomeScore = require("../models/learningOutcomeScore.model");
const nodemailer = require("nodemailer");
const VerificationCode = require("../models/verificationCode.model");

const { AuthFailureError } = require("../core/error.response");
const { getInfoData } = require("../utils");

class AccessService {
  static signUp = async ({
    email,
    password,
    fullname,
    accountableType,
    major,
  }) => {
    console.log("SignUp", {
      email,
      password,
      fullname,
      accountableType,
      major,
    });
    if (!email) throw new Error("Missing email");
    if (!password) throw new Error("Missing password");
    if (!fullname) throw new Error("Missing fullname");
    if (!accountableType) throw new Error("Missing accountableType");
    if (!major) throw new Error("Missing major");

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (validator.isStrongPassword(password)) {
      throw new Error(
        "Password is too weak. { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }"
      );
    }
    const foundUser = await Account.findOne({ where: { email } });
    if (foundUser) throw new Error("Email already exists");

    // Send code
    return await this.sendCode({ email });
  };

  static signIn = async ({ email, password }) => {
    if (!email || !password) throw new Error("Missing input fields");
    if (!validator.isEmail(email)) throw new Error("Invalid email format");

    const foundAccount = await Account.findOne({ where: { email } });
    if (!foundAccount) throw new Error("Invalid email or password");

    if (password !== "password123") {
      //Default password for testing
      const checkPassword = await bcrypt.compare(
        password,
        foundAccount.password
      );
      if (!checkPassword) throw new Error("Invalid email or password");
    }
    const checkStatus = foundAccount.active;
    if (!checkStatus) throw new AuthFailureError("Account is not active");

    const payload = {
      accountableType: foundAccount.accountableType,
      accountID: foundAccount.id,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE,
    });

    return {
      accessToken,
      expiresIn: process.env.TOKEN_EXPIRE,
    };
  };

  static sendCode = async ({ email }) => {
    if (!email) throw new Error("Missing input fields");
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000);

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is ${randomSixDigit}`,
      html: `<p>Your verification code is <strong>${randomSixDigit}</strong></p>`,
    };

    try {
      await transport.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Error sending email");
    }

    // save code to db
    const foundCode = await VerificationCode.create({
      email,
      code: randomSixDigit,
    });

    if (!foundCode) throw new Error("Cannot save code to database");

    return foundCode;
  };

  static verifyCode = async ({ email, code }) => {
    if (!email) throw new Error("Missing email");
    if (!validator.isEmail(email)) throw new Error("Invalid email format");

    if (!code) throw new Error("Missing code");

    const foundCode = await VerificationCode.findOne({
      where: {
        email,
        code,
      },
    });

    if (!foundCode) throw new Error("Invalid code");

    let isValid;
    const now = new Date();
    const expiredAt = new Date(foundCode.expiredAt);
    if (now > expiredAt) {
      isValid = false;
    } else {
      await VerificationCode.destroy({
        where: {
          email,
          code,
        },
      });
      isValid = true;
    }

    return {
      isValid,
    };
  };

  static createAccount = async ({
    email,
    password,
    fullname,
    accountableType,
    major,
  }) => {
    // Create account
    const hashPassword = await bcrypt.hash(password, 10);

    const active = accountableType === "student" ? true : false;

    const newAccount = await Account.create({
      email,
      password: hashPassword,
      accountableType,
      active: active,
    });
    if (!newAccount) throw new Error("Cannot create account");

    let newUserID;

    // Create user
    if (accountableType === "student") {
      const newStudent = await Student.create({
        fullName: fullname,
        major,
        accountID: newAccount.id,
      });
      if (!newStudent) throw new Error("Cannot create student");
      newUserID = newStudent.id;
      const allLearningOutcomes = await LearningOutcome.findAll();
      const scores = allLearningOutcomes.map((outcome) => ({
        studentID: newStudent.id,
        learningOutcomeID: outcome.id,
      }));
      await LearningOutcomeScore.bulkCreate(scores);
    }
    if (accountableType === "teacher") {
      const newTeacher = await Teacher.create({
        fullName: fullname,
        major,
        accountID: newAccount.id,
      });
      if (!newTeacher) throw new Error("Cannot create teacher");
      newUserID = newTeacher.id;
    }

    const payload = {
      accountableType,
      accountID: newAccount.id,
      userID: newUserID,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE,
    });

    return {
      accessToken,
      expiresIn: process.env.TOKEN_EXPIRE,
    };
  };

  static resetPassword = async ({ email, password }) => {
    if (!email) throw new Error("Missing email");
    if (!validator.isEmail(email)) throw new Error("Invalid email format");

    if (!password) throw new Error("Missing password");

    const foundAccount = await Account.findOne({ where: { email } });
    if (!foundAccount) throw new Error("Invalid email or password");

    const hashPassword = await bcrypt.hash(password, 10);

    const updatedAccount = await Account.update(
      { password: hashPassword },
      { where: { email } }
    );
    if (!updatedAccount) throw new Error("Cannot update password");

    return updatedAccount;
  };
}

module.exports = { AccessService };
