const { CREATED } = require("../core/success.response");
const CourseService = require('../services/course.service');

class CourseController {
    createCourse = async (req, res, next) => {
        new CREATED({
            message: "Create Course Success",
            metadata: await CourseService.createCourse(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    deleteCourse = async (req, res, next) => {
        new CREATED({
            message: "Delete Course Success",
            metadata: await CourseService.deleteCourse(req.params.courseId),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    editCourse = async (req, res, next) => {
        new CREATED({
            message: "Edit Course Success",
            metadata: await CourseService.editCourse(req.params.courseId, req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    getCourseById = async (req, res, next) => {
        new CREATED({
            message: "Get Course Success",
            metadata: await CourseService.getCourseById(req.params.courseId),
            options: { limit: 10 }
        }).send(res);
    }

    getAllCourses = async (req, res, next) => {
        new CREATED({
            message: "Get All Courses Success",
            metadata: await CourseService.getAllCourses(),
            options: { limit: 10 }
        }).send(res);
    }
}

module.exports = new CourseController();