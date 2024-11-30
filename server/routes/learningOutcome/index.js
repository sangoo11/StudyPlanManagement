"use strict";

const express = require('express');
const asyncHandler = require("../../helpers/asyncHandler");
const LearningOutcomeController = require("../../controllers/learningOutcome.controller");
const router = express.Router();

router.get('/get-learningoutcome-score/:studentId', asyncHandler(LearningOutcomeController.getLearningOutcomeScoreByStudentId))

module.exports = router;