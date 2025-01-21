const { CREATED } = require('../core/success.response');
const TeacherService = require('../services/teacher.service')

class TeacherController {
    //handle get Teacher list 
    grade = async (req, res, next) => {
        new CREATED({
            message: "Grade Teacher Score OK",
            metadata: await TeacherService.grade(req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle get all teachers
    getAllTeachers = async (req, res, next) => {
        new CREATED({
            message: "GET All Teachers OK",
            metadata: await TeacherService.getAllTeachers(),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle get all inactive teachers
    getAllInactiveTeachers = async (req, res, next) => {
        new CREATED({
            message: "GET All Inactive Teachers OK",
            metadata: await TeacherService.getAllInactiveTeachers(),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle get Teacher by ID
    getTeacherByID = async (req, res, next) => {
        new CREATED({
            message: "GET Teacher By ID OK",
            metadata: await TeacherService.getTeacherByID(req.params.teacherID),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle update Teacher by ID
    updateTeacherByID = async (req, res, next) => {
        new CREATED({
            message: "UPDATE Teacher By ID OK",
            metadata: await TeacherService.updateTeacherByID(req.body, req.params.teacherID),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle delete Teacher by ID
    deleteTeacherByID = async (req, res, next) => {
        new CREATED({
            message: "DELETE Teacher By ID OK",
            metadata: await TeacherService.deleteTeacherByID(req.params.teacherID),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}

module.exports = new TeacherController();