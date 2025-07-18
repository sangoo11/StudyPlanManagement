"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler")
const AccessController = require("../controllers/access.controller");
const router = express.Router();

//auth API
router.post('/signup', asyncHandler(AccessController.SignUp));
router.post('/signin', asyncHandler(AccessController.SignIn));
router.post('/send-code', asyncHandler(AccessController.SendCode));
router.post('/verify-code', asyncHandler(AccessController.VerifyCode));
router.post('/create-account', asyncHandler(AccessController.CreateAccount));
router.post('/forgot-password', asyncHandler(AccessController.ForgotPassword));
router.post('/reset-password', asyncHandler(AccessController.ResetPassword));



module.exports = router;
