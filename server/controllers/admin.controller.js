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

    //handle delete student
    deleteStudentFromCourse = async (req, res, next) => {
        new CREATED({
            message: 'Delete Student Success',
            metadata: await AdminService.deleteStudentFromCourse(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle delete teacher
    deleteTeacherFromCourse = async (req, res, next) => {
        new CREATED({
            message: 'Delete Teacher Success',
            metadata: await AdminService.deleteTeacherFromCourse(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Handle activate user
    activateUser = async (req, res, next) => {
        new CREATED({
            message: 'User activated successfully',
            metadata: await AdminService.activateUser(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Handle deactivate user
    deactivateUser = async (req, res, next) => {
        new CREATED({
            message: 'User deactivated successfully',
            metadata: await AdminService.deactivateUser(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Handle getUserById
    getUserById = async (req, res, next) => {
        new CREATED({
            message: "GetUserById Success",
            metadata: await AdminService.getUserById(req.params.userId),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //Handle delete user
    deleteUser = async (req, res, next) => {
        new CREATED({
            message: "DeleteUser Success",
            metadata: await AdminService.deleteUser(req.params.userId),
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

module.exports = new AdminController();
