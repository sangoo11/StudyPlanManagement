const { CREATED } = require("../core/success.response");
const { AdminService } = require('../services/admin.service');

class AdminController {
    //handle getAllCourse
    getAllCourse = async (req, res, next) => {
        new CREATED({
            message: "GetAllClass Success",
            metadata: await AdminService.getAllCourse(),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle getAllStudent
    getAllStudent = async (req, res, next) => {
        new CREATED({
            message: "getAllStudent Success",
            metadata: await AdminService.getAllStudent(),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle getAllTeacher
    getAllTeacher = async (req, res, next) => {
        new CREATED({
            message: "getAllTeacher Success",
            metadata: await AdminService.getAllTeacher(),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle enrollment student
    enrollStudentInCourse = async (req, res, next) => {
        new CREATED({
            message: 'Enroll Student Success',
            metadata: await AdminService.enrollStudentInCourse(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle enrollment teacher
    enrollTeacherInCourse = async (req, res, next) => {
        new CREATED({
            message: 'Enroll Teacher Success',
            metadata: await AdminService.enrollTeacherInCourse(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

}

module.exports = new AdminController();