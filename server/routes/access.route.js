"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler")
const AccessController = require("../controllers/access.controller");
const router = express.Router();

//auth API
router.post('/signup', asyncHandler(AccessController.SignUp));
router.post('/signin', asyncHandler(AccessController.SignIn));

module.exports = router;
