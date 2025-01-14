const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const SubjectController = require('../controllers/subject.controller');

// Get All Subjects
router.get('/get-all-subject', asyncHandler(SubjectController.getAllSubject));
router.get('/get-all-subject-code', asyncHandler(SubjectController.getAllSubjectCode));

// Create a new subject
router.post('/create-new-subject', asyncHandler(SubjectController.createSubject));

// Edit a subject
router.put('/edit-subject/:subjectID', asyncHandler(SubjectController.editSubject));

// Delete a subject
router.delete('/delete-subject/:subjectID', asyncHandler(SubjectController.deleteSubject));

module.exports = router;