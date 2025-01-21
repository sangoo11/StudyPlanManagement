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

    getSubjectById = async (req, res, next) => {
        new CREATED({
            message: "Get Subject Success",
            metadata: await SubjectService.getSubjectById(req.params.subjectId),
            options: { limit: 10 }
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
            metadata: await SubjectService.createSubject(req.params.majorID, req.body),
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

    getAllSubjectFactor = async (req, res, next) => {
        new CREATED({
            message: "Get All Subject Factors Success",
            metadata: await SubjectService.getAllSubjectFactor(),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    getSubjectInLOByStudentID = async (req, res, next) => {
        new CREATED({
            message: "Get Subject In LO By Student ID Success",
            metadata: await SubjectService.getSubjectInLOByStudentID(req.params.studentID),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    getLOScore = async (req, res, next) => {
        new CREATED({
            message: "Get LO Score Success",
            metadata: await SubjectService.getLOScore(req.params.LOID),
            options: {
                limit: 10,
            },
        }).send(res);
    }
}

module.exports = new SubjectController();