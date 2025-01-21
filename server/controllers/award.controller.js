const { CREATED } = require("../core/success.response");
const AwardService = require('../services/award.service');

class AwardController {
    getAllAward = async (req, res, next) => {
        new CREATED({
            message: "Get All Awards Success",
            metadata: await AwardService.getAllAward(),
            options: { limit: 10 }
        }).send(res);
    }

    getAwardById = async (req, res, next) => {
        new CREATED({
            message: "Get Award Success",
            metadata: await AwardService.getAwardById(req.params.awardID),
            options: { limit: 10 }
        }).send(res);
    }

    getStudentByAwardId = async (req, res, next) => {
        new CREATED({
            message: "Get Student By Award Success",
            metadata: await AwardService.getStudentByAwardId(req.params.awardID),
            options: { limit: 10 }
        }).send(res);
    }

    createAward = async (req, res, next) => {
        new CREATED({
            message: "Create Award Success",
            metadata: await AwardService.createAward(req.body),
            options: { limit: 10 }
        }).send(res);
    }

    updateAward = async (req, res, next) => {
        new CREATED({
            message: "Edit Award Success",
            metadata: await AwardService.updateAward(req.params.awardID, req.body),
            options: { limit: 10 }
        }).send(res);
    }

    deleteAward = async (req, res, next) => {
        new CREATED({
            message: "Delete Award Success",
            metadata: await AwardService.deleteAward(req.params.awardID),
            options: { limit: 10 }
        }).send(res);
    }

    getAllAwardByStudent = async (req, res, next) => {
        new CREATED({
            message: "Get All Awards By Student Success",
            metadata: await AwardService.getAllAwardByStudent(req.params.studentID),
            options: { limit: 10 }
        }).send(res);
    }

    addAwardForStudent = async (req, res, next) => {
        new CREATED({
            message: "Add Award For Student Success",
            metadata: await AwardService.addAwardForStudent(req.params.awardID, req.body),
            options: { limit: 10 }
        }).send(res);
    }

    deleteAwardForStudent = async (req, res, next) => {
        new CREATED({
            message: "Delete Award For Student Success",
            metadata: await AwardService.deleteAwardForStudent(req.params.awardID, req.body),
            options: { limit: 10 }
        }).send(res);
    }
}

module.exports = new AwardController();