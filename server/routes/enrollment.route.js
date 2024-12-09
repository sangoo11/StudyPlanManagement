const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const EnrollmentController = require('../controllers/enrollment.controller');

// Get enrollments by userId
router.get('/get-enrollments/:userId', asyncHandler(EnrollmentController.getEnrollmentsByStudentId));

module.exports = router;