const { Course, User } = require('../models');
const { ROLE } = require('./access.service');

class CourseService {
    static createCourse = async ({
        name,
        semester,
        year,
        teacherId,
    }) => {
        if (teacherId) {
            const teacher = await User.findOne({
                where: {
                    id: teacherId,
                    role: ROLE.TEACHER
                }
            });
            if (!teacher) throw new Error('Teacher not found or invalid role');
        }

        const courseExists = await Course.findOne({
            where: {
                name: name,
            }
        })
        if (courseExists) throw new Error('Course already exists');

        // Create new course
        const newCourse = await Course.create({
            name,
            semester,
            year,
            teacherId,
        });
        if (!newCourse) throw new Error('Failed to create course');

        return {
            code: 201,
            course: newCourse
        };
    }

    static deleteCourse = async (courseId) => {
        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        await course.destroy();

        return {
            code: 200,
            message: `Course ${courseId} deleted successfully`
        };
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
            const teacher = await User.findOne({
                where: {
                    id: teacherId,
                    role: ROLE.TEACHER
                }
            });
            if (!teacher) throw new Error('Teacher not found or invalid role');
        }

        if (name) {
            const courseName = await Course.findOne({
                where: {
                    name: name,
                }
            })
            if (courseName) throw new Error('Course name already exists');
        }

        await course.update({
            name: name || course.name,
            semester: semester || course.semester,
            year: year || course.year,
            teacherId: teacherId || course.teacherId,
            active: active || course.active,
        });

        return {
            code: 200,
            message: "Course updated successfully",
            course
        };
    }

    static getCourseById = async (courseId) => {
        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        return {
            code: 200,
            course
        };
    }

    static getAllCourses = async () => {
        const courseList = await Course.findAll();
        if (!courseList) throw new Error("Course list not found");
        return {
            code: 200,
            courseList,
        }
    }
}

module.exports = CourseService;