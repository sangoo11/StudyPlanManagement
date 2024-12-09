const { Enrollment, Course, User } = require('../models');
const { ROLE } = require('./access.service');

class EnrollmentService {
    static getEnrollmentsByStudentId = async (studentId) => {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        const enrollments = await Enrollment.findAll({
            where: { studentId: userId },
            include: [{
                model: Course,
                attributes: ['id', 'name', 'semester', 'year'],
                include: [{
                    model: User,
                    as: 'teacher',
                    attributes: ['id', 'fullname', 'email']
                }]
            }]
        });

        if (!enrollments) throw new Error('No enrollments found');

        return {
            message: "Enrollments retrieved successfully",
            enrollments: enrollments
        }
    }
}
module.exports = EnrollmentService;