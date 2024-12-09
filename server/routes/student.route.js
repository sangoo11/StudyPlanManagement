"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler")
const StudentController = require("../controllers/student.controller")
const router = express.Router();
const { authUser } = require('../authServer')

//Student crud
router.get("/get-credit-learn", asyncHandler(StudentController.getCreditLearn))

module.exports = router;