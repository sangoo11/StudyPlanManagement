const { CREATED } = require('../core/success.response');
const StudentService = require('../services/student.service')

class StudentController {
    //handle get student list 
    getCreditLearn = async (req, res, next) => {
        new CREATED({
            message: "GET Student Credits OK",
            metadata: await StudentService.getCreditLearn(req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}

module.exports = new StudentController();