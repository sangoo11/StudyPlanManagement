"use strict";

const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

router.use("/v1/api/access", require("./access"));
router.use("/v1/api/student", require("./student"));
router.use("/v1/api/teacher", require("./teacher"));
router.use("/v1/api/admin", require("./admin"));
// router.use("/v1/api/learningOutcome", require("./learningOutcome"));

module.exports = router;
