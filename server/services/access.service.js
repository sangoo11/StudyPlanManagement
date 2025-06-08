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
const crypto = require("crypto");
const { Op } = require("sequelize");

const { AuthFailureError } = require("../core/error.response");

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

class AccessService {
  static signUp = async ({
    email,
    password,
    fullname,
    accountableType,
    major,
  }) => {
    if (!email || !password || !fullname || !accountableType || !major) {
      throw new Error("Missing input fields");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
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
      const scores = allLearningOutcomes.map((outcome) => {
        let initialLevel = 'NT1'; // Default level

        // Set specific levels based on learning outcome ID
        if (outcome.id >= 3 && outcome.id <= 7) {
          initialLevel = 'KN1';
        } else if (outcome.id === 8) {
          initialLevel = 'TD1';
        }

        return {
          studentID: newStudent.id,
          learningOutcomeID: outcome.id,
          highestLevel: initialLevel
        };
      });
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

  static async forgotPassword({ email }) {
    if (!email) throw new Error('Please provide email');

    // Find the account with the provided email
    const account = await Account.findOne({
      where: { email }
    });

    if (!account) {
      throw new Error('No account found with this email address');
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    // Update account with reset token
    await account.update({
      resetToken,
      resetTokenExpiry
    });

    // Send reset password email
    const resetUrl = `${process.env.FRONTEND_URL}/forgot-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Password Reset Request',
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1DA599;">Password Reset Request</h2>
                <p>You have requested to reset your password.</p>
                <p>Click the button below to reset your password:</p>
                <div style="text-align: center; margin: 30px 0; width: fit-content;">
                    <a href="${resetUrl}" 
                       style="background-color: #1DA599; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <p style="color: #666; font-size: 12px;">
                    This is an automated message, please do not reply to this email.
                </p>
            </div>
        `
    };

    try {
      await transport.sendMail(mailOptions);

      return {
        success: true,
        message: 'Password reset link has been sent to your email'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      // If email sending fails, remove the reset token
      await account.update({
        resetToken: null,
        resetTokenExpiry: null
      });
      throw new Error('Failed to send reset password email. Please try again.');
    }
  }

  static async resetPassword({ token, password }) {
    if (!token || !password) {
      throw new Error('Token and password are required');
    }

    // Find account with valid reset token
    const account = await Account.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          [Op.gt]: new Date() // Token hasn't expired
        }
      }
    });

    if (!account) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update account with new password and clear reset token
    await account.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    });

    return {
      success: true,
      message: 'Password has been reset successfully'
    };
  }
}

module.exports = { AccessService };
