"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler")
const StudentController = require("../controllers/student.controller")
const router = express.Router();
const { authUser } = require('../authServer')

// router.get("/get-credit-learn/:studentID", asyncHandler(StudentController.getCreditLearn))
router.get("/get-all-student", asyncHandler(StudentController.getAllStudents))
router.get("/get-student/:studentID", asyncHandler(StudentController.getStudentByID))
router.put("/update-student/:studentID", asyncHandler(StudentController.updateStudentByID))
router.put("/delete-student/:studentID", asyncHandler(StudentController.deleteStudentByID))
router.get("/get-student-learning-outcome-score/:studentID", asyncHandler(StudentController.getStudentLearningOutcomeScore))

module.exports = router;