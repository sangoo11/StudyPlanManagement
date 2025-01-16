const Student = require('../models/student.model');
const Account = require('../models/account.model');
const Teacher = require('../models/teacher.model');
const Admin = require('../models/admin.model');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const { AuthFailureError } = require('../core/error.response');
const { getInfoData } = require('../utils');

class AccessService {
    static signUp = async ({
        email,
        password,
        fullname,
        accountableType,
        major,
    }) => {
        if (!email || !password || !fullname || !accountableType || !major) {
            throw new Error('Missing input fields');
        }
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email format');
        }
        if (validator.isStrongPassword(password)) {
            throw new Error('Password is too weak. { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }');
        }
        const foundUser = await Account.findOne({ where: { email } });
        if (foundUser) throw new Error('Email already exists');

        // Create account
        const hashPassword = await bcrypt.hash(password, 10);

        const active = accountableType === 'student' ? true : false;

        const newAccount = await Account.create({
            email,
            password: hashPassword,
            accountableType,
            active: active,
        });
        if (!newAccount) throw new Error('Cannot create account');

        let newUserID;

        // Create user
        if (accountableType === 'student') {
            const newStudent = await Student.create({
                fullName: fullname,
                major,
                accountID: newAccount.id,
            })
            if (!newStudent) throw new Error('Cannot create student');
            newUserID = newStudent.id;
        }
        if (accountableType === 'teacher') {
            const newTeacher = await Teacher.create({
                fullName: fullname,
                major,
                accountID: newAccount.id,
            })
            if (!newTeacher) throw new Error('Cannot create teacher');
            newUserID = newTeacher.id;
        }

        const payload = {
            accountableType,
            accountID: newAccount.id,
            userID: newUserID,
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE,
        })

        return {
            accessToken,
            expiresIn: process.env.TOKEN_EXPIRE,
        }
    }

    static signIn = async ({
        email,
        password
    }) => {
        if (!email || !password) throw new Error('Missing input fields');
        if (!validator.isEmail(email)) throw new Error('Invalid email format');

        const foundAccount = await Account.findOne({ where: { email } });
        if (!foundAccount) throw new Error('Invalid email or password');

        if (password !== 'password123') { //Default password for testing
            const checkPassword = await bcrypt.compare(password, foundAccount.password);
            if (!checkPassword) throw new Error('Invalid email or password');
        }
        const checkStatus = foundAccount.active;
        if (!checkStatus) throw new AuthFailureError('Account is not active');

        const payload = {
            accountableType: foundAccount.accountableType,
            accountID: foundAccount.id,
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE,
        })

        return {
            accessToken,
            expiresIn: process.env.TOKEN_EXPIRE,
        }
    }

}

module.exports = { AccessService }

