const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const { ROLE } = require('../services/access.service');
const User = require('../models/user.model');
const UserController = require('../controllers/user.controller');

// Check role
router.get('/check-role/:userId', asyncHandler(UserController.checkUserRole));

module.exports = router;