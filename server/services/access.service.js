const User = require('../models/user.model')
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { AuthFailureError } = require('../core/error.response');
const { getInfoData } = require('../utils');

const ROLE = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

class AccessService {
    static signUp = async ({
        email,
        password,
        fullname,
        role,
        major,
        year,
    }) => {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) throw new Error('Email already exists');
        const hashPassword = await bcrypt.hash(password, 10);

        const status = role === ROLE.STUDENT ? 'active' : 'unactive';

        const newUser = await User.create({
            email,
            password: hashPassword,
            fullName: fullname,
            role: role,
            major,
            year,
            status: status,
        })

        if (!newUser) throw new Error('Create student fail')

        const payload = {
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role,
            fullName: newUser.fullName
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE,
        })

        return {
            code: 201,
            user: {
                id: newUser.id,
                fullName: newUser.fullname,
                email: newUser.email,
                role: newUser.role,
                status: newUser.status,
            },
            accessToken,
            expiresIn: process.env.TOKEN_EXPIRE,
        }
    }

    static signIn = async ({
        email,
        password
    }) => {
        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) throw new AuthFailureError('Invalid email or password');

        const checkPassword = await bcrypt.compare(password, existingUser.password);
        if (!checkPassword) throw new AuthFailureError('Invalid email or password');

        const payload = {
            userId: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE,
        });

        return {
            code: 201,
            user: {
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role,
                createdAt: existingUser.createdAt,
            },
            accessToken,
            expiresIn: process.env.TOKEN_EXPIRE,
        }
    }

}


module.exports = { AccessService, ROLE }

