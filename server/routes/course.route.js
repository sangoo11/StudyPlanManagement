const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const CourseController = require('../controllers/course.controller');

// Create course route
router.post('/create-new-course/:subjectID', asyncHandler(CourseController.createCourse));

// Delete course route
router.put('/delete-course/:courseID', asyncHandler(CourseController.deleteCourse));

// Edit course route
router.put('/edit-course/:courseID', asyncHandler(CourseController.editCourse));

//Get course route
router.get('/get-course/:courseId', asyncHandler(CourseController.getCourseById));
router.get('/get-all-courses', asyncHandler(CourseController.getAllCourses));
router.get('/get-all-courses/:teacherID', asyncHandler(CourseController.getAllCoursesByTeacher));

//Get courses year
router.get('/get-all-course-year', asyncHandler(CourseController.getAllCoursesYear));

module.exports = router;