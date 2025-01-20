const { CREATED } = require('../core/success.response')
const LearningOutcomeService = require('../services/learningOutcome.service')

class LearningOutcomeController {
    //handle get all learning outcome
    getAllLearningOutcome = async (req, res, next) => {
        new CREATED({
            message: "Get all learning outcome successfully",
            metadata: await LearningOutcomeService.getAllLearningOutcome(),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle get learning outcome by id
    getLearningOutcomeById = async (req, res, next) => {
        new CREATED({
            message: "Get learning outcome by id successfully",
            metadata: await LearningOutcomeService.getLearningOutcomeById(req.params.id),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle create learning outcome
    createLearningOutcome = async (req, res, next) => {
        new CREATED({
            message: "Create learning outcome successfully",
            metadata: await LearningOutcomeService.createLearningOutcome(req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle update learning outcome
    updateLearningOutcome = async (req, res, next) => {
        new CREATED({
            message: "Update learning outcome successfully",
            metadata: await LearningOutcomeService.updateLearningOutcome(req.params.id, req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle delete learning outcome
    deleteLearningOutcome = async (req, res, next) => {
        new CREATED({
            message: "Delete learning outcome successfully",
            metadata: await LearningOutcomeService.deleteLearningOutcome(req.params.id),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle create subject learning outcome
    createSubjectLearningOutcome = async (req, res, next) => {
        new CREATED({
            message: "Create subject - learning outcome successfully",
            metadata: await LearningOutcomeService.createSubjectLearningOutcome(req.params.LOID, req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle delete subject learning outcome
    deleteSubjectLearningOutcome = async (req, res, next) => {
        new CREATED({
            message: "Delete subject - learning outcome successfully",
            metadata: await LearningOutcomeService.deleteSubjectLearningOutcome(req.params.LOID, req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle update subject learning outcome
    updateSubjectLearningOutcome = async (req, res, next) => {
        new CREATED({
            message: "Update subject - learning outcome successfully",
            metadata: await LearningOutcomeService.updateSubjectLearningOutcome(req.params.LOID, req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle get all subject by learning outcome id
    getAllSubjectByLOID = async (req, res, next) => {
        new CREATED({
            message: "Get all subject by learning outcome id successfully",
            metadata: await LearningOutcomeService.getAllSubjectByLOID(req.params.LOID),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    //handle get all learning outcome by subject id
    getAllLearningOutcomeBySubjectID = async (req, res, next) => {
        new CREATED({
            message: "Get all learning outcome by subject id successfully",
            metadata: await LearningOutcomeService.getAllLearningOutcomeBySubjectID(req.params.subjectID),
            options: {
                limit: 10,
            }
        }).send(res)
    }
};

module.exports = new LearningOutcomeController();