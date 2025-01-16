const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const { ROLE } = require('../services/access.service');
const AccountController = require('../controllers/account.controller');

// Check role
router.get('/check-role/:accountID', asyncHandler(AccountController.checkAccountRole));

// Active account
router.put("/activate-account/:accountID", asyncHandler(AccountController.activeAccount));

// Deactive account
router.put("/deactivate-account/:accountID", asyncHandler(AccountController.deactiveAccount));

// Get user ID by account ID
router.get("/get-user-id/:accountID", asyncHandler(AccountController.getUserIDByAccountID));

// Get userData by account ID
router.get("/get-user-data/:accountID", asyncHandler(AccountController.getUserDataByAccountID));

// Edit userData by account ID
router.put("/edit-user-data/:accountID", asyncHandler(AccountController.editUserDataByAccountID));

module.exports = router;