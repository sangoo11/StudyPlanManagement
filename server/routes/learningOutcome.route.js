"use strict";

const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const LearningOutcomeController = require('../controllers/learningOutcome.controller');

router.get('/get-all-learning-outcome', asyncHandler(LearningOutcomeController.getAllLearningOutcome));
router.get('/get-learning-outcome/:id', asyncHandler(LearningOutcomeController.getLearningOutcomeById));
router.post('/create-learning-outcome', asyncHandler(LearningOutcomeController.createLearningOutcome));
router.put('/edit-learning-outcome/:id', asyncHandler(LearningOutcomeController.updateLearningOutcome));
router.put('/delete-learning-outcome/:id', asyncHandler(LearningOutcomeController.deleteLearningOutcome));

router.post('/create-subject-learning-outcome/:LOID', asyncHandler(LearningOutcomeController.createSubjectLearningOutcome));
router.delete('/delete-subject-learning-outcome/:LOID', asyncHandler(LearningOutcomeController.deleteSubjectLearningOutcome));
router.put('/edit-subject-learning-outcome/:LOID', asyncHandler(LearningOutcomeController.updateSubjectLearningOutcome));

router.get('/get-all-subject/:LOID', asyncHandler(LearningOutcomeController.getAllSubjectByLOID));
router.get('/get-all-learning-outcome/:subjectID', asyncHandler(LearningOutcomeController.getAllLearningOutcomeBySubjectID));

// Create learning outcome scores for new student
router.post('/create-scores', asyncHandler(LearningOutcomeController.createStudentScores));

module.exports = router;