const { CREATED } = require("../core/success.response");
const EnrollmentService = require('../services/enrollment.service');

class EnrollmentController {
    getEnrollmentsByStudentId = async (req, res, next) => {
        new CREATED({
            message: "Get Enrollments Success",
            metadata: await EnrollmentService.getEnrollmentsByStudentId(req.params.studentId),
            options: {
                limit: 10,
            },
        }).send(res);
    }
}

module.exports = new EnrollmentController();