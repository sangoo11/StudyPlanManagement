const { Enrollment, Subject, User } = require('../models')
const { sql, Op } = require('@sequelize/core');

class StudentService {
    static getCreditLearn = async ({ studentId }) => {
        const student = await User.findOne({
            where: {
                id: studentId,
                role: 'student'
            }
        });
        if (!student) throw new Error('Student not found or student role is invalid');

        const enrollments = await Enrollment.findAll({
            where: {
                studentId: studentId,
                status: 'completed'
            },
            attributes: ['courseId'],
        });

        const courseIds = enrollments.map(enrollment => enrollment.courseId)

        const subjects = await Subject.findAll({
            where: {
                id: courseIds
            },
            attributes: ['credit']
        });

        const totalCredits = subjects.reduce((accumulator, subject) => accumulator + subject.credit, 0);

        return {
            studentId: studentId,
            creditLearned: totalCredits,
        };
    }
}

module.exports = StudentService;