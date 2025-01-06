const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const { ROLE } = require('../services/access.service');
const UserController = require('../controllers/user.controller');

// Check role
router.get('/check-role/:userId', asyncHandler(UserController.checkUserRole));

module.exports = router;