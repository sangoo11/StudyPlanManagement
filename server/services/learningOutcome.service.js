const Subject = require('../models/subject.model');
const SubjectScore = require('../models/subjectScore.model');
const LearningOutcome = require('../models/learningOutcome.model');
const LearningOutcomeScore = require('../models/learningOutcomeScore');

class LearningOutcomeService {
    static async getLearningOutcomeScoresByStudentId(studentId) {
        try {
            // Get all subject scores for the student
            const subjectScores = await SubjectScore.findAll({
                where: { studentId },
                include: [{
                    model: Subject,
                    attributes: ['id', 'name', 'multiplicationFactor'],
                    include: [{
                        model: LearningOutcomeScore,
                        include: [LearningOutcome]
                    }]
                }]
            });

            // Initialize outcome scores object
            const outcomeScores = {};

            // Process each subject score
            for (const subjectScore of subjectScores) {
                // Skip if not fully graded
                if (!subjectScore.isFullyGraded()) continue;

                // Get total score for the subject
                const totalScore = subjectScore.getTotalScore();

                // Apply subject multiplication factor
                const weightedScore = totalScore * subjectScore.Subject.multiplicationFactor;

                // Process each learning outcome for this subject
                for (const outcomeScore of subjectScore.Subject.LearningOutcomeScores) {
                    const outcomeId = outcomeScore.LearningOutcome.id;
                    const contribution = outcomeScore.contributionPercentage / 100;

                    // Initialize outcome score if not exists
                    if (!outcomeScores[outcomeId]) {
                        outcomeScores[outcomeId] = {
                            code: outcomeScore.LearningOutcome.code,
                            name: outcomeScore.LearningOutcome.name,
                            totalScore: 0,
                            contributingSubjects: 0
                        };
                    }

                    // Add weighted score contribution
                    outcomeScores[outcomeId].totalScore += weightedScore * contribution;
                    outcomeScores[outcomeId].contributingSubjects++;
                }
            }

            // Calculate final averages and format results
            const results = Object.values(outcomeScores).map(outcome => ({
                code: outcome.code,
                name: outcome.name,
                score: outcome.contributingSubjects > 0
                    ? (outcome.totalScore / outcome.contributingSubjects).toFixed(2)
                    : 0
            }));

            return {
                studentId,
                learningOutcomes: results.sort((a, b) => a.code - b.code)
            };

        } catch (error) {
            throw new Error(`Error calculating learning outcome scores: ${error.message}`);
        }
    }
}

module.exports = { LearningOutcomeService };