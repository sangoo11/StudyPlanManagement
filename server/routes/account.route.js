const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const { ROLE } = require('../services/access.service');
const AccountController = require('../controllers/account.controller');

// Check role
router.get('/check-role/:accountID', asyncHandler(AccountController.checkAccountRole));

module.exports = router;