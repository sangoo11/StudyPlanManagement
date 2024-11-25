require('dotenv').config();
const bcrypt = require('bcrypt');
const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');
const Admin = require('../models/admin.model');
const Account = require('../models/account.model');
const { AuthFailureError } = require('../core/error.response');
const { getInfoData } = require('../utils');
const jwt = require('jsonwebtoken')

const RoleUser = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

class StudentAccessService {
    //student signup
    static signUp = async ({
        username,
        password,
        email,
        fullname,
        phone_number,
        role,
    }) => {
        //find student email exits or not
        const holderStudent = await Account.findOne({ where: { email: email } });
        if (holderStudent) {
            throw new Error("Email already exists");
        }

        //hash password
        const passwordHash = await bcrypt.hash(password, 10);

        //create new student
        const newStudent = await Student.create({
            fullname,
            phone_number,
            email,
            major_id: 'CNPM',
            birth: '1/1/2006',
            role,
            date_begin: '1/1/2006',
        })

        //check student is created or not
        if (!newStudent) {
            throw new AuthFailureError("Student not created")
        }

        //create new account 
        const newStudentAccount = await Account.create({
            username,
            email,
            password: passwordHash,
            accountableId: newStudent.id,
            accountableType: RoleUser.STUDENT,
        })

        //check student account create or not
        if (!newStudentAccount) {
            throw new AuthFailureError("Account not created");
        }

        return {
            code: 201,
            metadata: {
                //create new user object
                user: getInfoData({
                    fields: ["username", "password"],
                    object: newStudentAccount
                })
            }
        }
    }

    //student signin
    static signIn = async ({
        email,
        password,
    }) => {
        //check if student exits or not 
        const foundStudent = await Account.findOne({
            where: {
                email: email,
                accountableType: RoleUser.STUDENT
            }
        })

        //if student not exits
        if (!foundStudent) {
            throw new AuthFailureError("Student account not found");
        }

        //check password that hashed
        const checkPassword = await bcrypt.compare(password, foundStudent.password)

        //if password is wrong 
        if (!checkPassword) {
            throw new AuthFailureError("Invalid password");
        }

        //create acccess token
        const payload = {
            email: foundStudent.email,
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })

        return {
            //create new user object
            user: getInfoData({
                fields: ["username", "accountableType"],
                object: foundStudent,
            })
        }
    }
}

module.exports = { StudentAccessService }

