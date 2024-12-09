"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler")
const TeacherController = require("../controllers/teacher.controller")
const router = express.Router();
const { authUser } = require('../authServer')

//Student crud
router.post("/grade", asyncHandler(TeacherController.grade))

module.exports = router;