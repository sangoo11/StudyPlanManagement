const { CREATED } = require("../core/success.response");
const SubjectService = require('../services/subject.service');

class SubjectController {
    getAllSubject = async (req, res, next) => {
        new CREATED({
            message: "Get All Subjects Success",
            metadata: await SubjectService.getAllSubject(),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    getAllSubjectCode = async (req, res, next) => {
        new CREATED({
            message: "Get All Subjects Code Success",
            metadata: await SubjectService.getAllSubjectCode(),
            options: {
                limit: 10,
            },
        }).send(res);
    }
}

module.exports = new SubjectController();