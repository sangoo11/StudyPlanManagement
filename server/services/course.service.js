const { where } = require('sequelize');
const Course = require('../models/course.model');
const { ROLE } = require('./access.service');
const axios = require('axios');
const Teacher = require('../models/teacher.model');
const Subject = require('../models/subject.model');
const Enrollment = require('../models/enrollment.model');
const Student = require('../models/student.model');

class CourseService {
    static createCourse = async (subjectID, {
        courseCode,
        semester,
        year,
        teacherID,
    }) => {
        // Validation
        if (!courseCode || !semester || !year || !subjectID) {
            throw new Error('Missing required fields');
        }

        // TeacherID
        if (teacherID) {
            const currentTeacher = await Teacher.findByPk(teacherID);
            if (!currentTeacher) throw new Error('Teacher not found');
        }

        // SubjectID
        const currentSubject = await Subject.findByPk(subjectID);
        if (!currentSubject) throw new Error('Subject not found');

        // CourseCode
        const courseExist = await Course.findOne({
            where: {
                courseCode: courseCode,
                active: true,
            }
        })
        if (courseExist) throw new Error('Course code already exists');

        const subjectCode = courseCode.split('.')[0];
        console.log(subjectCode, currentSubject.subjectCode);
        if (subjectCode !== currentSubject.subjectCode) throw new Error('Subject code does not match');

        // Year
        const yearPattern = /^\d{4}-\d{4}$/;
        if (!yearPattern.test(year)) throw new Error('Invalid year format');

        const [startYear, endYear] = year.split('-').map(Number);
        if (endYear !== startYear + 1) throw new Error('Invalid year range');

        // Semester
        if (semester < 1 || semester > 2) throw new Error('Invalid semester');

        // Create new course
        const newCourse = await Course.create({
            courseCode: courseCode,
            semester: semester,
            year: year,
            subjectID: subjectID,
            teacherID: teacherID || null,
        });
        if (!newCourse) throw new Error('Failed to create course');

        return {
            course: newCourse
        }
    }

    static deleteCourseByID = async (courseID) => {
        if (!courseID) throw new Error('Missing student ID');

        const currentCourse = await Course.findByPk(courseID);
        if (!currentCourse) throw new Error('Course not found');

        await currentCourse.update({
            active: false
        });

        return {
            courseID: courseID,
            active: false
        };
    }

    static editCourse = async (courseID, {
        courseCode,
        semester,
        year,
        teacherID,
        active,
    }) => {
        // Validation
        if (!courseID) throw new Error('Missing course ID');
        const currentCourse = await Course.findByPk(courseID);
        if (!currentCourse) throw new Error('Course not found');

        // Check if courseCode exists
        if (courseCode) {
            const existingCourse = await Course.findOne({ where: { courseCode } });
            if (existingCourse && existingCourse.id !== courseID) {
                throw new Error('Course code already exists');
            }
        }
        // TeacherID
        if (teacherID) {
            if (currentCourse.active === false && !active) throw new Error('Course is not active');
            const currentTeacher = await Teacher.findByPk(teacherID);
            if (!currentTeacher) throw new Error('Teacher not found');
        }

        // Year
        if (year) {
            const yearPattern = /^\d{4}-\d{4}$/;
            if (!yearPattern.test(year)) throw new Error('Invalid year format');


            const [startYear, endYear] = year.split('-').map(Number);
            if (endYear !== startYear + 1) throw new Error('Invalid year range');
        };

        // Semester
        if (semester && (semester < 1 || semester > 2)) throw new Error('Invalid semester');

        await currentCourse.update({
            courseCode: courseCode || currentCourse.courseCode,
            semester: semester || currentCourse.semester,
            year: year || currentCourse.year,
            teacherID: teacherID || currentCourse.teacherId,
            active: active || currentCourse.active,
        });

        return {
            course: currentCourse
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

    static getAllCoursesByTeacher = async (teacherID) => {
        const courseList = await Course.findAll({
            where: {
                teacherID: teacherID
            }
        });
        if (!courseList) throw new Error("Course list not found");
        return courseList
    }

    static getAllCourseYear = async () => {
        const courseList = await Course.findAll({
            attributes: ['year'],
            group: ['year'],
        });
        if (!courseList) throw new Error("Course list not found");
        return courseList
    }

    static getStudentCourse = async (courseID) => {
        if (!courseID) throw new Error('Missing course ID');
        const course = await Course.findByPk(courseID);
        if (!course) throw new Error('Course not found');

        const enrollmentList = await Enrollment.findAll({
            where: {
                courseID: courseID
            }
        },
            {
                attributes: ['studentID']
            }
        );
        if (!enrollmentList) throw new Error("This course does not have any student");

        const studentListsID = enrollmentList.map(student => student.studentID);
        const studentLists = await Promise.all(
            studentListsID.map(async (studentID) => {
                const student = await Student.findByPk(studentID);
                if (!student) throw new Error('Student not found');
                return student;
            })
        );

        return studentLists;
    }
}

module.exports = CourseService;