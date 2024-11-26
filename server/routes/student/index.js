"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler")
const StudentController = require("../../controllers/student.controller")
const router = express.Router();

//Student crud
router.get("/get-all-students", asyncHandler(StudentController.getStudentList))

module.exports = router;