"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler")
const AccessController = require("../../controllers/access.controller");
const router = express.Router();

// Student-site API
router.post("/customer-site/signup", asyncHandler(AccessController.customerSignUp));
router.post("/customer-site/login", asyncHandler(AccessController.customerLogin));

// Teacher-site API
router.post("/store-site/signup", asyncHandler(AccessController.staffSignUp));
router.post("/store-site/login", asyncHandler(AccessController.staffLogin));

// Admin-site API
router.post("/store-site/signup", asyncHandler(AccessController.staffSignUp));
router.post("/store-site/login", asyncHandler(AccessController.staffLogin));

module.exports = router;
