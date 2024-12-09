const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const AdminController = require('../controllers/admin.controller')

router.get('/get-all-course', asyncHandler(AdminController.getAllCourse));
router.get('/get-all-student', asyncHandler(AdminController.getAllStudent));
router.get('/get-all-teacher', asyncHandler(AdminController.getAllTeacher));

//manage course
router.post('/enroll-student', asyncHandler(AdminController.enrollStudentInCourse))
router.post('/enroll-teacher', asyncHandler(AdminController.enrollTeacherInCourse))

router.delete('/delete-student-course', asyncHandler(AdminController.deleteStudentFromCourse));
router.delete('/delete-teacher-course', asyncHandler(AdminController.deleteTeacherFromCourse));

//manage user
router.post('/activate-user', asyncHandler(AdminController.activateUser));
router.post('/deactivate-user', asyncHandler(AdminController.deactivateUser));

router.delete('/delete-user/:userId', asyncHandler(AdminController.deleteUser));
router.get('/get-user/:userId', asyncHandler(AdminController.getUserById));

module.exports = router;