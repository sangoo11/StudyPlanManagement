"use strict";

const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

router.use("/v1/api/access", require("./access.route"));
router.use("/v1/api/student", require("./student.route"));
router.use("/v1/api/teacher", require("./teacher.route"));
router.use("/v1/api/admin", require("./admin.route"));
router.use("/v1/api/course", require("./course.route"));
router.use("/v1/api/learning-outcome", require("./learningOutcome.route"));
router.use("/v1/api/learning-outcome-level", require("./learningOutcomeLevel.route"));
router.use("/v1/api/account", require("./account.route"));
router.use("/v1/api/enrollment", require("./enrollment.route"));
router.use("/v1/api/subject", require("./subject.route"));
router.use("/v1/api/major", require("./major.route"));
router.use("/v1/api/score", require("./score.route"));
router.use("/v1/api/award", require("./award.routes"));
router.use("/v1/api/knowledge-field", require("./knowledgeField.route"));
router.use("/v1/api/knowledge-domain", require("./knowledgeDomain.route"));
router.use("/v1/api/certificate", require("./certificate.route"));
router.use("/v1/api/verification-log", require("./verificationLogs.route"));

// test 1
module.exports = router;
