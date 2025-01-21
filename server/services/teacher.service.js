// const User = require('../models/user.model');
// const Course = require('../models/course.model');
// const Enrollment = require('../models/enrollment.model');
// const Score = require('../models/score.model');
// const { sql, Op } = require('@sequelize/core');
const Teacher = require('../models/teacher.model');
const sequelize = require('../configs/sequelize');
const { Op } = require('sequelize');
class TeacherService {
    static getAllTeachers = async () => {
        const teachers = await Teacher.findAll();
        if (!teachers) throw new Error("No teacher found")

        return teachers;
    }

    static getAllInactiveTeachers = async () => {
        const teachers = await Teacher.findAll({
            where: {
                status: {
                    [Op.ne]: "active"
                }
            }
        })
        if (!teachers) throw new Error("No unactive teacher found")

        return teachers;
    }

    static getTeacherByID = async (teacherID) => {
        if (!teacherID) throw new Error('Missing teacher ID');

        const teacher = await Teacher.findOne({
            where: {
                id: teacherID,
            }
        });
        if (!teacher) throw new Error('Teacher not found');

        return teacher;
    }

    static updateTeacherByID = async (updateData, teacherID) => {
        if (!updateData) throw new Error('Missing update data');
        if (!teacherID) throw new Error('Missing teacher ID');

        const teacher = await Teacher.findOne({
            where: {
                id: teacherID
            }
        });
        if (!teacher) throw new Error('Teacher not found');

        await teacher.update(updateData);

        return teacher;
    }

    static deleteTeacherByID = async (teacherID) => {
        if (!teacherID) throw new Error('Missing teacher ID');

        const transaction = await sequelize.transaction();
        try {
            const teacher = await Teacher.findOne({
                where: {
                    id: teacherID
                }
            });
            if (!teacher) throw new Error('Teacher not found');

            await teacher.update({
                status: 'terminated',
            }, {
                transaction: transaction,
            });

            const accountID = teacher.accountID;

            await Account.update({
                active: false,
            }, {
                where: {
                    id: accountID,
                },
                transaction: transaction,
            });

            await transaction.commit();
            return {
                teacherID: teacherID,
                status: teacher.status,
                accountID: accountID,
                active: false,
            };
        } catch (error) {
            await transaction.rollback();
            throw new Error("Delete unsucessfully", error.message);
        }
    }
    //     static grade = async ({
    //         studentId,
    //         teacherId,
    //         courseId,
    //         score,
    //     }) => {
    //         const student = await User.findOne({
    //             where: {
    //                 id: studentId,
    //                 role: 'student'
    //             }
    //         });
    //         if (!student) throw new Error('Student not found or student role is invalid');

    //         const teacher = await User.findOne({
    //             where: {
    //                 id: teacherId,
    //                 role: 'teacher'
    //             }
    //         });
    //         if (!teacher) throw new Error('Teacher not found or teacher role is invalid');

    //         const course = await Course.findOne({
    //             where: {
    //                 id: courseId,
    //                 teacherId: teacherId
    //             }
    //         });
    //         if (!course) throw new Error('Course not exists or teacher id is not in this course');

    //         const enrollment = await Enrollment.findOne({
    //             where: {
    //                 courseId: courseId,
    //                 studentId: studentId,
    //             }
    //         });
    //         if (!enrollment) throw new Error('Student id is not in this course');

    //         const studentGrades = await Score.findAll({
    //             where: {
    //                 studentId: studentId,
    //                 teacherId: teacherId,
    //                 courseId: courseId,
    //             },
    //             attributes: ['score'],
    //         });

    //         function calculateAverage(grades) {
    //             if (grades.length === 0) {
    //                 return 0;
    //             }
    //             const sum = grades.reduce(
    //                 (acc, grade) => acc + parseFloat(grade), 0);
    //             return sum / grades.length;
    //         }

    //         function formatToDecimal(value, precision) {
    //             return value.toFixed(precision);
    //         }

    //         let finalGrade;
    //         const grades = studentGrades.map(studentGrades => studentGrades.score);

    //         if (grades === null)
    //             finalGrade = score
    //         else
    //             finalGrade = formatToDecimal((calculateAverage(grades)), 2);

    //         const updateFinalScore = await Enrollment.update(
    //             { finalGrade: finalGrade },
    //             {
    //                 where: {
    //                     studentId: studentId,
    //                     courseId: courseId
    //                 }
    //             }
    //         );
    //         if (!updateFinalScore) throw new Error('Update final score fail')

    //         const scoreAdd = await Score.create({
    //             score: score,
    //             studentId: studentId,
    //             teacherId: teacherId,
    //             courseId: courseId,
    //         });
    //         if (!scoreAdd) throw new Error('Grade student fail');


    //         return {
    //             studentId: studentId,
    //             teacherId: teacherId,
    //             courseId: courseId,
    //             score: score,
    //             finalGrade: finalGrade
    //         }
    //     }
}

module.exports = TeacherService;