const { CREATED } = require("../core/success.response");
const EnrollmentService = require('../services/enrollment.service');

class EnrollmentController {
    getIncompleteEnrollment = async (req, res, next) => {
        new CREATED({
            message: "Get Student Incomplete Enrollment Success",
            metadata: await EnrollmentService.getIncompleteEnrollment(req.params.studentID),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    getCompleteEnrollment = async (req, res, next) => {
        new CREATED({
            message: "Get Student Complete Enrollment Success",
            metadata: await EnrollmentService.getCompleteEnrollment(req.params.studentID),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    enrollStudentInCourse = async (req, res, next) => {
        new CREATED({
            message: "Enroll Student Success",
            metadata: await EnrollmentService.enrollStudentInCourse(req.body, req.params.courseID),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    enrollTeacherInCourse = async (req, res, next) => {
        new CREATED({
            message: "Enroll Teacher Success",
            metadata: await EnrollmentService.enrollTeacherInCourse(req.body, req.params.courseID),
        }).send(res);
    }

    deleteStudentFromCourse = async (req, res, next) => {
        new CREATED({
            message: "Delete Student Success",
            metadata: await EnrollmentService.deleteStudentFromCourse(req.params.studentID, req.params.courseID),
        }).send(res);
    }

    deleteTeacherFromCourse = async (req, res, next) => {
        new CREATED({
            message: "Delete Teacher Success",
            metadata: await EnrollmentService.deleteTeacherFromCourse(req.params.teacherID, req.params.courseID),
        }).send(res);
    }
}

module.exports = new EnrollmentController();