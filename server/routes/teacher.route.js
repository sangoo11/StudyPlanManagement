"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler")
const TeacherController = require("../controllers/teacher.controller")
const router = express.Router();
const { authUser } = require('../authServer')

router.post("/grade", asyncHandler(TeacherController.grade))

router.get("/get-all-teacher", asyncHandler(TeacherController.getAllTeachers))
router.get("/get-all-inactive-teacher", asyncHandler(TeacherController.getAllInactiveTeachers))


router.get("/get-teacher/:teacherID", asyncHandler(TeacherController.getTeacherByID))
router.put("/update-teacher/:teacherID", asyncHandler(TeacherController.updateTeacherByID))
router.put("/delete-teacher/:teacherID", asyncHandler(TeacherController.deleteTeacherByID))

module.exports = router;