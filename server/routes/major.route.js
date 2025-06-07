const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const MajorController = require('../controllers/major.controller');

// Get all majors
router.get('/', asyncHandler(MajorController.getMajors));

// Get major by ID
router.get('/get-major/:majorID', asyncHandler(MajorController.getMajorByID));

module.exports = router;