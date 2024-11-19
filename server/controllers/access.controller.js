const { CREATED } = require("../core/success.response")
import { StudentAccessService, TeacherAccessService, AdminAccessService } from '../services/access.service'

class AccessController {
    studentSignUp = async (req, res, next) => {
        new CREATED({
            message: 'Signup Successs',
            metadata: await StudentAccessService
        })
    }
    studentSignIn = async (req, res, next) => {

    }
    teacherSignUp = async (req, res, next) => {

    }
    teacherSignIn = async (req, res, next) => {

    }
    adminSignIn = async (req, res, next) => {

    }

}

module.exports = new AccessController();