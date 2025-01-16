const Subject = require('../models/subject.model');
const SubjectScore = require('../models/score.model');
const LearningOutcome = require('../models/learningOutcome.model');
const SubjectLearningOutcome = require('../models/subjectLearningOutcome.model');
const { where } = require('sequelize');

class LearningOutcomeService {
    static getAllLearningOutcome = async () => {
        return await LearningOutcome.findAll();
    }

    static getLearningOutcomeById = async (id) => {
        if (!id) {
            throw new Error('Missing required fields: id');
        }
        const learningOutcome = await LearningOutcome.findByPk(id);
        if (!learningOutcome) {
            throw new Error('Learning Outcome not found');
        }
        return learningOutcome;
    }

    static createLearningOutcome = async ({
        learningOutcomeCode,
        learningOutcomeName,
        description,
    }) => {
        if (!learningOutcomeCode || !learningOutcomeName) {
            throw new Error('Missing required fields');
        }
        const learningOutcome = await LearningOutcome.create({
            learningOutcomeCode,
            learningOutcomeName,
            description,
        });
        if (!learningOutcome) {
            throw new Error('Failed to create Learning Outcome');
        }

        return learningOutcome;
    }

    static updateLearningOutcome = async (id, {
        learningOutcomeName,
        description,
        active,
    }) => {
        if (!id) {
            throw new Error('Missing required fields: id');
        }
        const learningOutcome = await LearningOutcome.findByPk(id);
        if (!learningOutcome) {
            throw new Error('Learning Outcome not found');
        }
        if (learningOutcome.active) {
            throw new Error('Learning Outcome is already active');
        }
        if (active !== true) {
            throw new Error('Learning Outcome is not correct format');
        }


        await learningOutcome.update({
            learningOutcomeName: learningOutcomeName || learningOutcome.learningOutcomeName,
            description: description || learningOutcome.description,
            active: active || learningOutcome.active,
        });

        return learningOutcome;
    }

    static deleteLearningOutcome = async (id) => {
        if (!id) {
            throw new Error('Missing required fields: id');
        }
        const learningOutcome = await LearningOutcome.findByPk(id);
        if (!learningOutcome) {
            throw new Error('Learning Outcome not found');
        }

        await learningOutcome.update({
            active: false,
        });

        return learningOutcome;
    }

    static createSubjectLearningOutcome = async (LOID, { subjectID }) => {
        if (!LOID || !subjectID) {
            throw new Error('Missing required fields');
        }
        const learningOutcome = await LearningOutcome.findByPk(LOID);
        if (!learningOutcome) {
            throw new Error('Learning Outcome not found');
        }
        const subject = await Subject.findByPk(subjectID);
        if (!subject) {
            throw new Error('Subject not found');
        }

        const subjectLearningOutcome = await SubjectLearningOutcome.findOne({
            where: {
                learningOutcomeID: LOID,
                subjectID: subjectID,
            }
        });

        if (subjectLearningOutcome) {
            throw new Error('Subject - Learning Outcome already linked');
        } else {
            const newSubjectLearningOutcome = await SubjectLearningOutcome.create({
                learningOutcomeID: LOID,
                subjectID: subjectID
            });
            if (!newSubjectLearningOutcome) {
                throw new Error('Failed to create Subject - Learning Outcome');
            }
        }

        return subjectID + ' linked with ' + LOID;
    }

    static deleteSubjectLearningOutcome = async (LOID, { subjectID }) => {
        if (!LOID || !subjectID) {
            throw new Error('Missing required fields');
        }
        const learningOutcome = await LearningOutcome.findByPk(LOID);
        if (!learningOutcome) {
            throw new Error('Learning Outcome not found');
        }
        if (!learningOutcome.active) {
            throw new Error('Learning Outcome is not active');
        }
        const subject = await Subject.findByPk(subjectID);
        if (!subject) {
            throw new Error('Subject not found');
        }

        const subjectLearningOutcome = await SubjectLearningOutcome.findOne({
            where: {
                learningOutcomeID: LOID,
                subjectID,
            }
        });

        if (!subjectLearningOutcome) {
            throw new Error('Subject - Learning Outcome not linked yet');
        } else {
            await SubjectLearningOutcome.destroy({
                where: {
                    learningOutcomeID: LOID,
                    subjectID,
                }
            });
        }

        return subjectID + ' unlinked with ' + LOID;
    }

    static getAllSubjectByLOID = async (LOID) => {
        if (!LOID) {
            throw new Error('Missing required fields');
        }
        const learningOutcome = await LearningOutcome.findByPk(LOID);
        if (!learningOutcome) {
            throw new Error('Learning Outcome not found');
        }

        const subjectLearningOutcome = await SubjectLearningOutcome.findAll({
            where: {
                LearningOutcomeID: LOID,
            }
        });

        if (!subjectLearningOutcome) {
            throw new Error('No subject linked with this Learning Outcome');
        }

        return subjectLearningOutcome;
    }

    static getAllLearningOutcomeBySubjectID = async (subjectID) => {
        if (!subjectID) {
            throw new Error('Missing required fields');
        }
        const subject = await Subject.findByPk(subjectID);
        if (!subject) {
            throw new Error('Subject not found');
        }

        const subjectLearningOutcome = await SubjectLearningOutcome.findAll({
            where: {
                subjectID,
            }
        });

        if (!subjectLearningOutcome) {
            throw new Error('No Learning Outcome linked with this Subject');
        }

        return subjectLearningOutcome;
    }
}

module.exports = LearningOutcomeService;