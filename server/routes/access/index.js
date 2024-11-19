"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler")
const AccessController = require("../../controllers/access.controller");
const router = express.Router();

// Student-site API
router.post("/customer-site/signup", asyncHandler(AccessController.studentSignUp));
router.post("/customer-site/login", asyncHandler(AccessController.studentSignIn));

// Teacher-site API
router.post("/store-site/signup", asyncHandler(AccessController.teacherSignUp));
router.post("/store-site/login", asyncHandler(AccessController.teacherSignIn));

// Admin-site API
router.post("/store-site/login", asyncHandler(AccessController.adminSignIn));

module.exports = router;
