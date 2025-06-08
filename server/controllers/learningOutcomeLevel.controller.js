const { CREATED } = require("../core/success.response");
const LearningOutcomeLevelService = require("../services/learningOutcomeLevel.service");

class LearningOutcomeLevelController {
    // Get all learning outcome levels
    getAllLevels = async (req, res, next) => {
        new CREATED({
            message: "Get All Learning Outcome Levels Success",
            metadata: await LearningOutcomeLevelService.getAllLevels(req.query),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Get learning outcome level by ID
    getLevelById = async (req, res, next) => {
        new CREATED({
            message: "Get Learning Outcome Level Success",
            metadata: await LearningOutcomeLevelService.getLevelById(req.params.id),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Create new learning outcome level
    createLevel = async (req, res, next) => {
        new CREATED({
            message: "Create Learning Outcome Level Success",
            metadata: await LearningOutcomeLevelService.createLevel(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Update learning outcome level
    updateLevel = async (req, res, next) => {
        new CREATED({
            message: "Update Learning Outcome Level Success",
            metadata: await LearningOutcomeLevelService.updateLevel(req.params.id, req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Delete learning outcome level
    deleteLevel = async (req, res, next) => {
        new CREATED({
            message: "Delete Learning Outcome Level Success",
            metadata: await LearningOutcomeLevelService.deleteLevel(req.params.id),
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

module.exports = new LearningOutcomeLevelController(); 