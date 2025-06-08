"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler")
const ScoreController = require("../controllers/score.controller")
const router = express.Router();

// handle grade score
router.post("/grade-score/:studentID", asyncHandler(ScoreController.gradeScore));

// handle get all scores
router.post("/get-student-score-by-id/:studentID", asyncHandler(ScoreController.getStudentScoreByID));

// handle get score
router.get("/:studentID", asyncHandler(ScoreController.getScore));

module.exports = router;