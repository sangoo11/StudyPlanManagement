"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler")
const ScoreController = require("../controllers/score.controller")
const router = express.Router();

// handle grade score
router.post("/grade-score/:studentID", asyncHandler(ScoreController.gradeScore));

// handle get all scores
router.get("/get-student-score-by-id/:studentID", asyncHandler(ScoreController.getStudentScoreByID));

module.exports = router;