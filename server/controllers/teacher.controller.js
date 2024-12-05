const { CREATED } = require('../core/success.response');
const TeacherService = require('../services/teacher.service')

class TeacherController {
    //handle get student list 
    grade = async (req, res, next) => {
        new CREATED({
            message: "Grade Student Score OK",
            metadata: await TeacherService.grade(req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}

module.exports = new TeacherController();