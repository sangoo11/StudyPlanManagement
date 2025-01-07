const Account = require('../models/account.model');
const Subject = require('../models/subject.model');
const Enrollment = require('../models/enrollment.model');
const { sql, Op } = require('@sequelize/core');
const Student = require('../models/student.model');

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
    static getStudentByID = async (studentID) => {
        const student = await Student.findOne({
            where: {
                id: studentID,
            }
        });
        if (!student) throw new Error('Student not found');

        return student;
    }

    static updateStudentByID = async (updateData, studentID) => {
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
        const student = await Student.findOne({
            where: {
                id: studentID
            }
        });
        if (!student) throw new Error('Student not found');

        await student.update({
            status: 'terminated'
        });

        return student;
    }
}

module.exports = StudentService;