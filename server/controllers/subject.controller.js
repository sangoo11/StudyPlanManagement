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

    createSubject = async (req, res, next) => {
        new CREATED({
            message: "Create Subject Success",
            metadata: await SubjectService.createSubject(req.body),
        }).send(res);
    }

    editSubject = async (req, res, next) => {
        new CREATED({
            message: "Edit Subject Success",
            metadata: await SubjectService.editSubject(req.params.subjectID, req.body),
        }).send(res);
    }

    deleteSubject = async (req, res, next) => {
        new CREATED({
            message: "Delete Subject Success",
            metadata: await SubjectService.deleteSubject(req.params.subjectID),
        }).send(res);
    }
}

module.exports = new SubjectController();