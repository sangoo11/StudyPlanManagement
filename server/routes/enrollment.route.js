const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const EnrollmentController = require('../controllers/enrollment.controller');

// Get enrollments by userId
router.get('/get-incomplete-enrollment/:studentID', asyncHandler(EnrollmentController.getIncompleteEnrollment));
router.get('/get-complete-enrollment/:studentID', asyncHandler(EnrollmentController.getCompleteEnrollment));

//manage course
router.post('/enroll-student/:courseID', asyncHandler(EnrollmentController.enrollStudentInCourse))
router.post('/enroll-teacher/:courseID', asyncHandler(EnrollmentController.enrollTeacherInCourse))

router.delete('/delete-student-enrollment', asyncHandler(EnrollmentController.deleteStudentFromCourse));

module.exports = router;