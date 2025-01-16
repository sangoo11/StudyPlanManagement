
"use strict";

const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");

router.get('/get-learningoutcome-score/:studentId', asyncHandler(LearningOutcomeController.getLearningOutcomeScoreByStudentId))
router.get('/get-learningoutcome-score', asyncHandler(LearningOutcomeController.getLearningOutcomeScore))


module.exports = router;