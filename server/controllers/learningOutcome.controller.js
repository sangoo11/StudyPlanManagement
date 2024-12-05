// const { CREATED } = require('../core/success.response')
// const { LearningOutcomeService } = require('../services/learningOutcome.service')

// class LearningOutcomeController {
//     getLearningOutcomeScoreByStudentId = async (req, res, next) => {
//         new CREATED({
//             message: 'GET LearningOutcomeScore By StudentId OK',
//             metadata: await LearningOutcomeService.getLearningOutcomeScoresByStudentId(req.body),
//             options: {
//                 limit: 10,
//             },
//         }).send(res);
//     };
// };

// module.exports = new LearningOutcomeController();