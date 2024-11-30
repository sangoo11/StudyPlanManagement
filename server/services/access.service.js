require('dotenv').config();
const bcrypt = require('bcrypt');
const { AuthFailureError } = require('../core/error.response');
const { getInfoData } = require('../utils');
const jwt = require('jsonwebtoken')

const RoleUser = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

class StudentAccessService {

}


module.exports = { StudentAccessService, RoleUser }

