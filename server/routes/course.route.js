const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const CourseController = require('../controllers/course.controller');

// Create course route
router.post('/create-new-course', asyncHandler(CourseController.createCourse));

// Delete course route
router.delete('/delete-course/:courseId', asyncHandler(CourseController.deleteCourse));

// Edit course route
router.put('/edit-course/:courseId', asyncHandler(CourseController.editCourse));

//Get course route
router.get('/get-course/:courseId', asyncHandler(CourseController.getCourseById));
router.get('/get-all-courses', asyncHandler(CourseController.getAllCourses));

module.exports = router;