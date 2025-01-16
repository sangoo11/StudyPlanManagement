const Account = require('../models/account.model');
const Subject = require('../models/subject.model');
const Enrollment = require('../models/enrollment.model');
const { sql, Op } = require('@sequelize/core');
const Student = require('../models/student.model');
const sequelize = require('../configs/sequelize');
const LearningOutcomeScore = require('../models/learningOutcomeScore.model');
const LearningOutcome = require('../models/learningOutcome.model');

class StudentService {
    // static getCreditLearn = async (studentID) => {
    //     const student = await Student.findOne({
    //         where: {
    //             id: studentID,
    //         },
    //         attributes: ['credit']
    //     });
    //     if (!student) throw new Error('Student not found');

    //     return {
    //         studentID: studentID,
    //         creditLearned: student.credit,
    //     };
    //     // const enrollments = await Enrollment.findAll({
    //     //     where: {
    //     //         studentID: studentID,
    //     //         completed: true
    //     //     },
    //     //     attributes: ['courseID'],
    //     // });

    //     // const courseIDs = enrollments.map(enrollment => enrollment.courseID)

    //     // const subjects = await Subject.findAll({
    //     //     where: {
    //     //         id: courseIDs
    //     //     },
    //     //     attributes: ['credit']
    //     // });

    //     // const totalCredits = subjects.reduce((accumulator, subject) => accumulator + subject.credit, 0);

    //     // return {
    //     //     studentID: studentID,
    //     //     creditLearned: totalCredits,
    //     // };
    // }
    static getAllStudents = async () => {
        const students = await Student.findAll();
        return students;
    }

    static getStudentByID = async (studentID) => {
        if (!studentID) throw new Error('Missing student ID');

        const student = await Student.findOne({
            where: {
                id: studentID,
            }
        });
        if (!student) throw new Error('Student not found');

        return student;
    }

    static updateStudentByID = async (updateData, studentID) => {
        if (!updateData) throw new Error('Missing update data');
        if (!studentID) throw new Error('Missing student ID');

        const student = await Student.findOne({
            where: {
                id: studentID
            }
        });
        if (!student) throw new Error('Student not found');

        await student.update(updateData);

        return student;
    }

    static deleteStudentByID = async (studentID) => {
        if (!studentID) throw new Error('Missing student ID');

        const transaction = await sequelize.transaction();
        try {
            const student = await Student.findOne({
                where: {
                    id: studentID
                }
            });
            if (!student) throw new Error('Student not found');

            await student.update({
                status: 'terminated',
            }, {
                transaction: transaction,
            });

            const accountID = student.accountID;

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
                studentID: studentID,
                status: student.status,
                accountID: accountID,
                active: false,
            };
        } catch (error) {
            await transaction.rollback();
            throw new Error("Delete unsucessfully", error.message);
        }
    }

    static getStudentLearningOutcomeScore = async (studentID) => {
        if (!studentID) throw new Error('Missing student ID');

        const student = await Student.findOne({
            where: {
                id: studentID,
            }
        });
        if (!student) throw new Error('Student not found');

        const learningOutcomeScore = await LearningOutcomeScore.findAll({
            where: {
                studentID: studentID,
            },
            include: {
                model: LearningOutcome,
                attributes: ['learningOutcomeCode'],
            },
        });
        if (!learningOutcomeScore) throw new Error('Learning Outcome Score not found');
        return learningOutcomeScore;
    }
}
module.exports = StudentService;