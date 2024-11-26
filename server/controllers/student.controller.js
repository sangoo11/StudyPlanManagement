const { CREATED } = require('../core/success.response');
const Student = require('../models/student.model');
const StudentService = require('../services/student.service')

class StudentController {
    //handle get student list 
    getStudentList = async (req, res, next) => {
        new CREATED({
            message: "GET all students OK",
            metadata: await StudentService.getStudentList(),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}

module.exports = new StudentController();