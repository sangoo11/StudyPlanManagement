"use strict";

const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

router.use("/v1/api/access", require("./access.route"));
router.use("/v1/api/student", require("./student.route"));
router.use("/v1/api/teacher", require("./teacher.route"));
router.use("/v1/api/admin", require("./admin.route"));
router.use('/v1/api/course', require('./course.route'));
router.use("/v1/api/learningOutcome", require("./learningOutcome.route"));
router.use("/v1/api/account", require("./account.route"));
router.use("/v1/api/enrollment", require("./enrollment.route"));
router.use("/v1/api/subject", require("./subject.route"));

module.exports = router;
