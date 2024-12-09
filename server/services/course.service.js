const { where } = require('sequelize');
const { Course } = require('../models');
const { ROLE } = require('./access.service');
const axios = require('axios');

class CourseService {
    static async checkUserRole(userId) {
        try {
            const response = await axios.get(`http://localhost:8080/v1/api/user/check-role/${userId}`);
            return response.data.metadata.user.userRole;
        } catch (error) {
            throw new Error(`Failed to check user role: ${error.message}`);
        }
    }

    static createCourse = async ({
        name,
        semester,
        year,
        teacherId,
    }) => {
        if (teacherId) {
            const roleCheck = await CourseService.checkUserRole(teacherId);
            if (roleCheck !== ROLE.TEACHER) {
                throw new Error('User is not a teacher');
            }
        }

        const courseExists = await Course.findOne({
            where: {
                name: name,
            }
        })
        if (courseExists) throw new Error('Course name already exists');

        // Create new course
        const newCourse = await Course.create({
            name,
            semester,
            year,
            teacherId,
        });
        if (!newCourse) throw new Error('Failed to create course');

        return {
            course: newCourse
        }
    }

    static deleteCourse = async (courseId) => {
        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        await course.destroy();

        return `Course ${courseId} deleted successfully`
    }

    static editCourse = async (courseId, {
        name,
        semester,
        year,
        teacherId,
        active
    }) => {
        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        if (teacherId) {
            const roleCheck = await CourseService.checkUserRole(teacherId);
            if (roleCheck !== ROLE.TEACHER) {
                throw new Error('User is not a teacher');
            }
        }

        if (name && name !== course.name) {
            const courseName = await Course.findOne({
                where: {
                    name: name,
                }
            })
            if (courseName) throw new Error('Course name already exists');
        }

        const updatedCourse = await course.update({
            name: name || course.name,
            semester: semester || course.semester,
            year: year || course.year,
            teacherId: teacherId || course.teacherId,
            active: active !== undefined ? active : course.active
        });

        return {
            message: "Course updated successfully",
            course: updatedCourse
        };
    }

    static getCourseById = async (courseId) => {
        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        return course
    }

    static getAllCourses = async () => {
        const courseList = await Course.findAll();
        if (!courseList) throw new Error("Course list not found");
        return courseList
    }
}

module.exports = CourseService;