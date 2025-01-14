const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const SubjectController = require('../controllers/subject.controller');

// Get All Subjects
router.get('/get-all-subject', asyncHandler(SubjectController.getAllSubject));
router.get('/get-all-subject-code', asyncHandler(SubjectController.getAllSubjectCode));

module.exports = router;