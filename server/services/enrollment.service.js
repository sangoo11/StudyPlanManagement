const Account = require('../models/account.model');
const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');
const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');
const Subject = require('../models/subject.model');
const sequelize = require('../configs/sequelize');
const { ROLE } = require('./access.service');

class EnrollmentService {
    static getIncompleteEnrollment = async (studentID) => {
        if (!studentID) throw new Error('Student ID is required');
        const currentStudent = await Student.findByPk(studentID);
        if (!currentStudent) throw new Error('Student not found');

        let incompleteSubjectLists = [];

        const incompleteCourseLists = await Enrollment.findAll({
            where: {
                studentID: studentID,
                completed: false,
            },
            attributes: ['courseID'],
        });

        for (let course of incompleteCourseLists) {
            const incompleteCourse = await Course.findByPk(course.courseID);
            const incompleteSubject = await Subject.findByPk(incompleteCourse.subjectID);
            incompleteSubjectLists.push(incompleteSubject);
        }

        return {
            studentID: studentID,
            incompleteSubjectLists: incompleteSubjectLists,
        }
    }

    static getCompleteEnrollment = async (studentID) => {

        if (!studentID) throw new Error('Student ID is required');
        const currentStudent = await Student.findByPk(studentID);
        if (!currentStudent) throw new Error('Student not found');

        let completeSubjectLists = [];

        const completeCourseLists = await Enrollment.findAll({
            where: {
                studentID: studentID,
                completed: true,
            },
            attributes: ['courseID'],
        });

        for (let course of completeCourseLists) {
            const completeCourse = await Course.findByPk(course.courseID);
            const completeSubject = await Subject.findByPk(completeCourse.subjectID);
            completeSubjectLists.push(completeSubject);
        }

        return {
            studentID: studentID,
            completeSubjectLists: completeSubjectLists,
        }
    }

    static enrollStudentInCourse = async (data, courseID) => {
        const transaction = await sequelize.transaction();

        if (!data || data.length === 0 || !courseID) throw new Error('Student ID and Course ID are required');

        const currentCourse = await Course.findByPk(courseID);
        if (!currentCourse) throw new Error('Course not found');

        const subject = await Subject.findByPk(currentCourse.subjectID);
        const subjectCredit = subject.credit;

        const studentListsID = [];

        // Handle each student in the list
        try {
            for (let student of data.studentLists) {
                // student model
                const currentStudent = await Student.findByPk(student.studentID);
                if (!currentStudent) throw new Error(`Student with ID ${student.studentID} not found`);

                // get courseID of incomplete course
                const studentIncompleteCourse = await Enrollment.findAll({
                    where: {
                        studentID: student.studentID,
                        completed: false,
                    },
                    attributes: ['courseID'],
                });

                // check if the student has an incomplete subject of course
                for (let course of studentIncompleteCourse) {
                    const existingCourse = await Course.findByPk(course.courseID);
                    if (existingCourse.subjectID === currentCourse.subjectID) {
                        throw new Error(`Student with ID ${student.studentID} already has an incomplete course of this subject`);
                    }
                }

                await Enrollment.create({
                    studentID: student.studentID,
                    courseID: courseID,
                    enrolledDate: new Date(),
                }, {
                    transaction: transaction,
                });

                await currentStudent.update({
                    credit: currentStudent.credit + subjectCredit,
                }, {
                    transaction: transaction,
                });

                await currentCourse.update({
                    studentCount: currentCourse.studentCount + 1,
                }, {
                    transaction: transaction,
                });

                studentListsID.push(student.studentID);
            }
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new Error(error.message);
        }
        return {
            credit: subjectCredit,
            courseID: courseID,
            studentCount: currentCourse.studentCount,
            studentLists: studentListsID,
            enrollmentDate: new Date(),
        }
    }

    static enrollTeacherInCourse = async (data, courseID) => {
        if (!data || !courseID) throw new Error('Teacher ID and Course ID are required');

        const course = await Course.findByPk(courseID);
        if (!course) throw new Error('Course not found');
        if (course.teacherID) throw new Error('Course already has a teacher');

        const teacher = await Teacher.findByPk(data.teacherID);
        if (!teacher) throw new Error('Teacher not found');

        course.update({
            teacherID: data.teacherID,
        });

        return {
            courseID: parseInt(courseID),
            teacherID: data.teacherID,
        }
    }
}
module.exports = EnrollmentService;