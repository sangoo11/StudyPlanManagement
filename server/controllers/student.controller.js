const { CREATED } = require('../core/success.response');
const StudentService = require('../services/student.service')

class StudentController {
    //handle get all students
    getAllStudents = async (req, res, next) => {
        new CREATED({
            message: "GET All Students OK",
            metadata: await StudentService.getAllStudents(),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle get student by ID
    getStudentByID = async (req, res, next) => {
        new CREATED({
            message: "GET Student By ID OK",
            metadata: await StudentService.getStudentByID(req.params.studentID),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle update student by ID
    updateStudentByID = async (req, res, next) => {
        new CREATED({
            message: "UPDATE Student By ID OK",
            metadata: await StudentService.updateStudentByID(req.body, req.params.studentID),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle delete student by ID
    deleteStudentByID = async (req, res, next) => {
        new CREATED({
            message: "DELETE Student By ID OK",
            metadata: await StudentService.deleteStudentByID(req.params.studentID),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle get student learning outcome score
    getStudentLearningOutcomeScore = async (req, res, next) => {
        new CREATED({
            message: "GET Student Learning Outcome Score OK",
            metadata: await StudentService.getStudentLearningOutcomeScore(req.params.studentID),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}
module.exports = new StudentController();