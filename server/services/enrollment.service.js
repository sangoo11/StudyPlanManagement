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
        const student = await Student.findByPk(studentID);
        if (!student) throw new Error('Student not found');

        const subjectLists = [];

        const courseLists = await Enrollment.findAll({
            where: {
                studentID: studentID,
                completed: false,
            },
        });

        const courseID = courseLists.map(course => course.courseID);
        for (let course of courseID) {
            const courseData = await Course.findByPk(course);
            const subjectData = await Subject.findByPk(courseData.subjectID);
            subjectLists.push(subjectData);
        }

        console.log(JSON.stringify(subjectLists));

        return {
            message: 'Incomplete enrollment',
        }
    }



    static enrollStudentInCourse = async (data, courseID) => {
        const transaction = await sequelize.transaction();

        if (!data || data.length === 0 || !courseID) throw new Error('Student ID and Course ID are required');

        const course = await Course.findByPk(courseID);
        if (!course) throw new Error('Course not found');

        const subject = await Subject.findByPk(course.subjectID);
        const subjectCredit = subject.credit;

        const studentListsID = [];

        // Handle each student in the list
        try {
            for (let student of data.studentLists) {
                const currentStudent = await Student.findByPk(student.studentID);
                if (!currentStudent) throw new Error('Student not found');

                const existingEnrollment = await Enrollment.findOne({
                    where: {
                        studentID: student.studentID,
                        courseID: courseID,
                        completed: false,
                    }
                });
                if (existingEnrollment) throw new Error('Student already enrolled in course');



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

                await course.update({
                    studentCount: course.studentCount + 1,
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
            studentCount: course.studentCount,
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