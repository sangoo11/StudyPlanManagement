"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler")
const AccessController = require("../../controllers/access.controller");
const router = express.Router();

// Student-site API
router.post("/student-site/signup", asyncHandler(AccessController.studentSignUp));
router.post("/student-site/signin", asyncHandler(AccessController.studentSignIn));

// Teacher-site API
router.post("/teacher-site/signup", asyncHandler(AccessController.teacherSignUp));
router.post("/teacher-site/signin", asyncHandler(AccessController.teacherSignIn));

// Admin-site API
router.post("/admin-site/signin", asyncHandler(AccessController.adminSignIn));

module.exports = router;
