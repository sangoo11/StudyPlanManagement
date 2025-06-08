const LearningOutcomeLevel = require('../models/learningOutcomeLevel.model');

class LearningOutcomeLevelService {
    static getAllLevels = async ({ learningOutcomeID }) => {
        try {
            let whereConditions = {}

            if (learningOutcomeID) {
                whereConditions.learningOutcomeID = learningOutcomeID
            }

            const levels = await LearningOutcomeLevel.findAll({
                where: whereConditions
            });
            if (!levels.length) {
                throw new Error('No learning outcome levels found');
            }
            return levels;
        } catch (error) {
            throw new Error(`Error getting learning outcome levels: ${error.message}`);
        }
    }

    static getLevelById = async (id) => {
        try {
            if (!id) {
                throw new Error('Missing required fields: id');
            }
            const level = await LearningOutcomeLevel.findByPk(id);
            if (!level) {
                throw new Error('Learning outcome level not found');
            }
            return level;
        } catch (error) {
            throw new Error(`Error getting learning outcome level: ${error.message}`);
        }
    }

    static createLevel = async ({ level }) => {
        try {
            if (!level) {
                throw new Error('Missing required fields: level');
            }
            const newLevel = await LearningOutcomeLevel.create({ level });
            if (!newLevel) {
                throw new Error('Failed to create learning outcome level');
            }
            return newLevel;
        } catch (error) {
            throw new Error(`Error creating learning outcome level: ${error.message}`);
        }
    }

    static updateLevel = async (id, { level }) => {
        try {
            if (!id || !level) {
                throw new Error('Missing required fields: id or level');
            }
            const existingLevel = await LearningOutcomeLevel.findByPk(id);
            if (!existingLevel) {
                throw new Error('Learning outcome level not found');
            }
            await existingLevel.update({ level });
            return existingLevel;
        } catch (error) {
            throw new Error(`Error updating learning outcome level: ${error.message}`);
        }
    }

    static deleteLevel = async (id) => {
        try {
            if (!id) {
                throw new Error('Missing required fields: id');
            }
            const level = await LearningOutcomeLevel.findByPk(id);
            if (!level) {
                throw new Error('Learning outcome level not found');
            }
            await level.destroy();
            return { message: 'Learning outcome level deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting learning outcome level: ${error.message}`);
        }
    }
}

module.exports = LearningOutcomeLevelService; 