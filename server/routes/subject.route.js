const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const SubjectController = require('../controllers/subject.controller');

// Get All Subjects
router.get('/get-all-subject', asyncHandler(SubjectController.getAllSubject));
router.get('/get-all-subject-code', asyncHandler(SubjectController.getAllSubjectCode));
router.get('/get-subject/:subjectId', asyncHandler(SubjectController.getSubjectById));

// Create a new subject
router.post('/create-new-subject/:majorID', asyncHandler(SubjectController.createSubject));

// Edit a subject
router.put('/edit-subject/:subjectID', asyncHandler(SubjectController.editSubject));

// Delete a subject
router.put('/delete-subject/:subjectID', asyncHandler(SubjectController.deleteSubject));

router.get('/get-all-subject-factor', asyncHandler(SubjectController.getAllSubjectFactor))

module.exports = router;