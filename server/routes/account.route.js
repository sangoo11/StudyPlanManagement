const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const { ROLE } = require('../services/access.service');
const AccountController = require('../controllers/account.controller');

// Check role
router.get('/check-role/:accountID', asyncHandler(AccountController.checkAccountRole));

// Active account
router.put("/active-account/:accountID", asyncHandler(AccountController.activeAccount));

// Deactive account
router.put("/deactive-account/:accountID", asyncHandler(AccountController.deactiveAccount));

module.exports = router;